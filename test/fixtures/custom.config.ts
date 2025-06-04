import { defineConfig } from "./util/defineConfig";

const parentDir = "parentDir";

export default defineConfig({
	entry: "./src/index.ts",
	dir: `${parentDir}/dist`,
});
