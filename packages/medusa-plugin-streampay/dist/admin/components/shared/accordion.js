"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const AccordionPrimitive = __importStar(require("@radix-ui/react-accordion"));
const icons_1 = require("@medusajs/icons");
const ui_1 = require("@medusajs/ui");
const active_circle_dotted_line_1 = __importDefault(require("./icons/active-circle-dotted-line"));
const Accordion = ({ children, ...props }) => {
    return ((0, jsx_runtime_1.jsx)(AccordionPrimitive.Root, { ...props, children: children }));
};
const Item = ({ title, subtitle, description, required, tooltip, children, className, complete, headingSize = "large", customTrigger = undefined, forceMountContent = undefined, active, triggerable, ...props }) => {
    return ((0, jsx_runtime_1.jsxs)(AccordionPrimitive.Item, { ...props, className: (0, ui_1.clx)("border-grey-20 group border-t last:mb-0", "py-1 px-8", className), children: [(0, jsx_runtime_1.jsx)(AccordionPrimitive.Header, { className: "px-1", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-full items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center p-[10px]", children: complete ? ((0, jsx_runtime_1.jsx)(icons_1.CheckCircleSolid, { className: "text-ui-fg-interactive" })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [active && ((0, jsx_runtime_1.jsx)(active_circle_dotted_line_1.default, { size: 20, className: "text-ui-fg-interactive rounded-full" })), !active && (0, jsx_runtime_1.jsx)(icons_1.CircleMiniSolid, { className: "text-ui-fg-muted" })] })) }), (0, jsx_runtime_1.jsx)(ui_1.Heading, { level: "h3", className: (0, ui_1.clx)("text-ui-fg-base"), children: title })] }), (0, jsx_runtime_1.jsx)(AccordionPrimitive.Trigger, { children: customTrigger || (0, jsx_runtime_1.jsx)(MorphingTrigger, {}) })] }), subtitle && ((0, jsx_runtime_1.jsx)(ui_1.Text, { as: "span", size: "small", className: "mt-1", children: subtitle }))] }) }), (0, jsx_runtime_1.jsx)(AccordionPrimitive.Content, { forceMount: forceMountContent, className: (0, ui_1.clx)("radix-state-closed:animate-accordion-close radix-state-open:animate-accordion-open radix-state-closed:pointer-events-none px-1"), children: (0, jsx_runtime_1.jsxs)("div", { className: "inter-base-regular group-radix-state-closed:animate-accordion-close", children: [description && (0, jsx_runtime_1.jsx)(ui_1.Text, { children: description }), (0, jsx_runtime_1.jsx)("div", { className: "w-full", children: children })] }) })] }));
};
Accordion.Item = Item;
const MorphingTrigger = () => {
    return ((0, jsx_runtime_1.jsx)("div", { className: "btn-ghost rounded-rounded group relative p-[6px]", children: (0, jsx_runtime_1.jsxs)("div", { className: "h-5 w-5", children: [(0, jsx_runtime_1.jsx)("span", { className: "bg-grey-50 rounded-circle group-radix-state-open:rotate-90 absolute inset-y-[31.75%] left-[48%] right-1/2 w-[1.5px] duration-300" }), (0, jsx_runtime_1.jsx)("span", { className: "bg-grey-50 rounded-circle group-radix-state-open:rotate-90 group-radix-state-open:left-1/2 group-radix-state-open:right-1/2 absolute inset-x-[31.75%] top-[48%] bottom-1/2 h-[1.5px] duration-300" })] }) }));
};
exports.default = Accordion;
