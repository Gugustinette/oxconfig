import { build } from "esbuild";

export interface Options {
	path?: string;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function loadConfigEsbuild(options: Options = {}): Promise<any> {
	const filePath = options.path || "custom.config.ts";
	const result = await build({
		entryPoints: [filePath],
		bundle: true,
		write: false, // Do not write to disk
		format: "esm", // Use ESM format
		platform: "node", // Target Node.js environment
	});

	const { text: code } = result.outputFiles[0];

	// Convert code to base64
	const code64 = Buffer.from(code).toString("base64");

	// Create a new module using the base64 encoded code
	const module = await import(`data:text/javascript;base64,${code64}`);

	// Check if the module has a default export and return it, otherwise return the module itself
	if (module.default) {
		return module.default;
	}
	return module;
}
