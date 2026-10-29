<!-- cspell:words ibuchanan redocly -->

# @forge-ahead/atlassian-api-types

Generated TypeScript types for selected Atlassian Cloud REST API OpenAPI
specs.

Use this package when an app already calls Atlassian REST APIs and needs
compiler types for OpenAPI `paths`, `components`, and `operations`.

This is a type-only package. It does not include an API client, auth handling,
runtime validation, or Forge resolver helpers.

## Install

Install it as a GitHub dependency. Prefer pinning a commit SHA or tag in real
apps so installs are reproducible:

```json
{
	"dependencies": {
		"@forge-ahead/atlassian-api-types": "github:ibuchanan/forge-ahead-atlassian-api-types#<commit-or-tag>"
	}
}
```

The generated source files live in `src/**/types.ts`. The published package
only includes `dist`, which npm builds during the Git dependency `prepare`
step.

## Usage

Import from a specific API surface when you know which product API you are
using:

```ts
import type {
	paths,
	operations,
} from "@forge-ahead/atlassian-api-types/jira-platform-3";

type JiraPaths = paths;
type JiraOperations = operations;
```

Or import the root package and use namespaced type exports:

```ts
import type { JiraPlatformV3 } from "@forge-ahead/atlassian-api-types";

type JiraPaths = JiraPlatformV3.paths;
type JiraOperations = JiraPlatformV3.operations;
```

## Supported APIs

Available import paths:

- `api-access`
- `assets`
- `automation`
- `bitbucket`
- `confluence-1`
- `confluence-2`
- `jira-platform-2`
- `jira-platform-3`
- `jira-software`
- `organization`

The package intentionally exports only the specs listed above. Do not assume an
Atlassian product API is available unless it appears in this list and in
`package.json` exports.

## Development

```bash
npm install
npm run generate
npm run check
```

`npm run generate` refreshes the generated TypeScript files from the API specs
listed in `redocly.yaml`.

`npm run check` runs TypeScript checks on the generated source and builds the
`dist` files that GitHub installs consume.

Formatting and linting are intentionally not configured because the public API
source is generated.

## License

Apache-2.0 licensed. See [LICENSE](LICENSE).
