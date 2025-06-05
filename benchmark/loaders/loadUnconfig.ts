import { loadConfig } from "unconfig";

export interface Options {
	path?: string;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function loadUnconfig(options: Options = {}): Promise<any> {
	const { config: unconfig } = await loadConfig({
		sources: [
			{
				files: options.path || "test/fixtures/custom.config.ts",
				// default extensions
				extensions: ["ts"],
			},
		],
		merge: true,
	});

	return unconfig;
}
