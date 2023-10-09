"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ui_1 = require("@medusajs/ui");
const Card = ({ icon, children, className }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, ui_1.clx)("p-4 rounded-lg gap-3", "flex items-start shadow-elevation-card-rest", "bg-ui-bg-subtle", className), children: [icon, (0, jsx_runtime_1.jsx)(ui_1.Text, { size: "base", className: "text-ui-fg-subtle", children: children })] }));
};
exports.default = Card;
