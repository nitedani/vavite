import type { Plugin, SSROptions, UserConfig } from "vite";

export default function vaviteDevServerPlugin(): Plugin {
	let dev: boolean;

	return {
		name: "@vavite/dev-server",

		enforce: "pre",

		resolveId(source, _importer, options) {
			if (source === "@vavite/dev-server/server" && dev && options.ssr) {
				return "virtual:@vavite/dev-server/server";
			}
		},

		load(id, options) {
			if (id === "virtual:@vavite/dev-server/server" && dev && options?.ssr) {
				return MODULE_CONTENTS;
			}
		},

		config(_config, env) {
			dev = env.command === "serve";

			const out: UserConfig & { ssr: SSROptions } = {
				ssr: {
					noExternal: ["@vavite/dev-server"],
				},
			};

			return out;
		},

		configureServer(server) {
			(global as any).__VITE_DEV_SERVER = server;
		},
	};
}

const MODULE_CONTENTS = `
	const server = __VITE_DEV_SERVER;
	export default server;
`;
