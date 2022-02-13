import { Lifecycle } from "@hapi/hapi";
import viteDevServer from "@vavite/dev-server/server";
import nav from "./nav";

const barRoute: Lifecycle.Method = async (req, h) => {
	let html = "<h1>Hello from page /bar</h1>" + nav;

	if (import.meta.env.DEV) {
		html = await viteDevServer!.transformIndexHtml(req.path, html);
	}

	return html;
};

export default barRoute;
