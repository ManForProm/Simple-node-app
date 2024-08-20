import pluginJs from "@eslint/js";
import globals from "globals";


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "modules"}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
];