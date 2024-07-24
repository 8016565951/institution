import globals from "globals";
import pluginJs from "@eslint/js";
import unusedImports from "eslint-plugin-unused-imports";

export default [
    { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
    {
        languageOptions: { globals: globals.node },
        plugins: {
            "unused-imports": unusedImports,
        },
        rules: {
            "no-unused-vars": "warn",
            semi: ["error", "always"],
            "unused-imports/no-unused-imports": "warn",
        },
    },
    pluginJs.configs.recommended,
];
