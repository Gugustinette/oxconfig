import { loadConfig } from "../src";
import { loadConfig as loadUnconfig } from "unconfig";
import { performance } from "node:perf_hooks";

let start: number;
let end: number;

// Unconfig benchmark
start = performance.now();
const { config: unconfig } = await loadUnconfig({
	sources: [
		{
			files: "test/fixtures/custom.config",
			// default extensions
			extensions: ["ts"],
		},
	],
	merge: true,
});
end = performance.now();
console.log("Unconfig loaded config:", unconfig);
console.log(`Unconfig took ${(end - start).toFixed(4)}ms to load config`);

// Oxconfig benchmark
start = performance.now();
const config = await loadConfig({
	path: "test/fixtures/custom.config.ts",
});
end = performance.now();
console.log("Oxconfig loaded config:", config);
console.log(`Oxconfig took ${(end - start).toFixed(4)}ms to load config`);
