import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000",
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [],
    },
  },
  // ignoreNoDocuments: true,
};

export default config;
