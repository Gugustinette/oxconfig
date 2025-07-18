import { jit } from "./util/jit";

export interface Options {
	path?: string;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function loadConfig(options: Options = {}): Promise<any> {
	// Load file content with fs
	const filePath = options.path || "custom.config.ts";

	const module = await jit({
		path: filePath,
	});

	if (module.default) {
		return module.default;
	}

	return module;
}
