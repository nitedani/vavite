export default {
	"**/*.ts?(x)": [
		() => "tsc -p packages/reloader/tsconfig.json --noEmit",
		"eslint --max-warnings 0 --ignore-pattern dist",
	],
	"*": "prettier --ignore-unknown --write",
};
