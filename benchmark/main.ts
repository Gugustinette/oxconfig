import { loadConfig } from "../src";
import { performance } from "node:perf_hooks";
import { loadUnconfig } from "./loaders/loadUnconfig";
import { loadConfigEsbuild } from "./loaders/loadConfigEsbuild";

let start: number;
let end: number;

// Unconfig benchmark
start = performance.now();
const unconfig = await loadUnconfig({
	path: "test/fixtures/custom.config",
});
end = performance.now();
console.log("Unconfig loaded config:", unconfig);
console.log(`Unconfig took ${(end - start).toFixed(4)}ms to load config`);

// Esbuild-based benchmark (this is the method Vite uses)
start = performance.now();
const esbuildConfig = await loadConfigEsbuild({
	path: "test/fixtures/custom.config.ts",
});
end = performance.now();
console.log("Esbuild loaded config:", esbuildConfig);
console.log(`Esbuild took ${(end - start).toFixed(4)}ms to load config`);

// Oxconfig benchmark
start = performance.now();
const config = await loadConfig({
	path: "test/fixtures/custom.config.ts",
});
end = performance.now();
console.log("Oxconfig loaded config:", config);
console.log(`Oxconfig took ${(end - start).toFixed(4)}ms to load config`);
