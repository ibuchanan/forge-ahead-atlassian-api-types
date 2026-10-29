import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const redoclyConfigPath = "redocly.yaml";
const vacuumRulesetPath = ".vacuum.yaml";
const vacuumBaseArgs = [
	"lint",
	"--ruleset",
	vacuumRulesetPath,
	"--no-style",
	"--no-banner",
	"--no-update-check",
	"--fail-severity",
	"error",
	"--timeout",
	"30",
];
const vacuumCheckArgs = [...vacuumBaseArgs, "--silent"];
const vacuumDetailsArgs = [...vacuumBaseArgs, "--details", "--errors"];

function parseRedoclyApis(configText) {
	const apis = [];
	let inApis = false;
	let currentApi;

	for (const line of configText.split(/\r?\n/)) {
		if (/^apis:\s*$/.test(line)) {
			inApis = true;
			currentApi = undefined;
			continue;
		}

		if (!inApis || /^\s*(?:#.*)?$/.test(line)) {
			continue;
		}

		if (/^\S/.test(line)) {
			break;
		}

		const apiMatch = line.match(/^ {2}([A-Za-z0-9_-]+):\s*$/);
		if (apiMatch) {
			currentApi = apiMatch[1];
			continue;
		}

		const rootMatch = line.match(/^ {4}root:\s*(.+?)\s*$/);
		if (rootMatch && currentApi) {
			apis.push({
				name: currentApi,
				root: rootMatch[1].replace(/^["']|["']$/g, ""),
			});
		}
	}

	return apis;
}

function fail(message) {
	console.error(message);
	process.exit(1);
}

if (!existsSync(redoclyConfigPath)) {
	fail(`Missing ${redoclyConfigPath}.`);
}

if (!existsSync(vacuumRulesetPath)) {
	fail(`Missing ${vacuumRulesetPath}.`);
}

const apis = parseRedoclyApis(readFileSync(redoclyConfigPath, "utf8"));

if (apis.length === 0) {
	fail(`No apis.*.root entries found in ${redoclyConfigPath}.`);
}

const vacuumVersion = spawnSync("vacuum", ["version"], {
	encoding: "utf8",
	stdio: ["ignore", "pipe", "pipe"],
});

if (vacuumVersion.error?.code === "ENOENT") {
	fail(
		"Missing vacuum CLI. Install it from https://quobix.com/vacuum/installing/ and retry.",
	);
}

if (vacuumVersion.status !== 0) {
	process.stderr.write(vacuumVersion.stderr);
	fail("Unable to run vacuum.");
}

let failures = 0;

for (const { name, root } of apis) {
	const result = spawnSync("vacuum", [...vacuumCheckArgs, root], {
		encoding: "utf8",
		stdio: ["ignore", "pipe", "pipe"],
	});

	if (result.error) {
		fail(result.error.message);
	}

	if (result.status !== 0) {
		failures += 1;
		console.log(`\n==> ${name} failed`);
		console.log(root);

		const details = spawnSync("vacuum", [...vacuumDetailsArgs, root], {
			encoding: "utf8",
			stdio: ["ignore", "pipe", "pipe"],
		});

		if (details.stdout) {
			process.stdout.write(details.stdout);
		}

		if (details.stderr) {
			process.stderr.write(details.stderr);
		}
	} else {
		console.log(`ok ${name}`);
	}
}

if (failures > 0) {
	fail(
		`\nVacuum failed for ${failures} OpenAPI spec${failures === 1 ? "" : "s"}.`,
	);
}

console.log(`\nVacuum passed for ${apis.length} OpenAPI specs.`);
