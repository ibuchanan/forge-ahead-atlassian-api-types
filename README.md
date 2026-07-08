# @forge-ahead/atlassian-api-types

Generated TypeScript types for selected Atlassian Cloud REST API OpenAPI specs.

This package is intended for type-only imports from GitHub. The generated files live in `src/**/types.ts`; `dist` is built during npm's Git dependency `prepare` step and is not committed.

## Install

Use the repository as a GitHub dependency:

```json
{
  "dependencies": {
    "@forge-ahead/atlassian-api-types": "github:ibuchanan/forge-ahead-atlassian-api-types"
  }
}
```

## Usage

Import a specific API surface:

```ts
import type { paths, operations } from "@forge-ahead/atlassian-api-types/jira-platform-3";

type JiraPaths = paths;
type JiraOperations = operations;
```

Or import the root package and use namespaced type exports:

```ts
import type { JiraPlatformV3 } from "@forge-ahead/atlassian-api-types";

type JiraPaths = JiraPlatformV3.paths;
type JiraOperations = JiraPlatformV3.operations;
```

Available subpaths:

- `api-access`
- `assets`
- `bitbucket`
- `confluence-1`
- `confluence-2`
- `jira-platform-2`
- `jira-platform-3`
- `jira-software`

## Development

```bash
npm install
npm run generate
npm run check
```

`npm run generate` refreshes the generated TypeScript files from the API specs in `redocly.yaml`. Formatting and linting are intentionally not configured because the public API source is generated. `npm run check` validates the generated types and emits the distributable files used by GitHub installs.

## License

Apache-2.0 licensed. See [LICENSE](LICENSE).
