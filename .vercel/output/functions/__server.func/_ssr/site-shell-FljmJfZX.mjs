import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-shell-FljmJfZX.js
var import_jsx_runtime = require_jsx_runtime();
function SiteShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-8 place-items-center rounded-lg text-sm font-bold text-primary-foreground",
							style: { backgroundImage: "var(--gradient-signal)" },
							"aria-hidden": true,
							children: "SB"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-base font-semibold tracking-tight",
							children: "SignBridge"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex items-center gap-1 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
								activeProps: { className: "text-foreground" },
								activeOptions: { exact: true },
								children: "Overview"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/research",
								className: "rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
								activeProps: { className: "text-foreground" },
								children: "Research"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/call",
								className: "ml-2 rounded-md bg-primary px-3.5 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90",
								children: "Live prototype"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border/70 py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-6xl px-5 text-xs text-muted-foreground",
					children: "SignBridge — Phase-1 closed-vocabulary prototype. Grand Hack IPEC 2026."
				})
			})
		]
	});
}
//#endregion
export { SiteShell as t };
