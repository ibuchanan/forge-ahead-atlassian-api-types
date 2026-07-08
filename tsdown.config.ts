import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "./src/index.ts",
    "api-access": "./src/api-access/types.ts",
    assets: "./src/assets/types.ts",
    bitbucket: "./src/bitbucket/types.ts",
    "confluence-1": "./src/confluence-1/types.ts",
    "confluence-2": "./src/confluence-2/types.ts",
    "jira-platform-2": "./src/jira-platform-2/types.ts",
    "jira-platform-3": "./src/jira-platform-3/types.ts",
    "jira-software": "./src/jira-software/types.ts",
  },
  clean: true,
  dts: true,
  format: ["esm"],
});
