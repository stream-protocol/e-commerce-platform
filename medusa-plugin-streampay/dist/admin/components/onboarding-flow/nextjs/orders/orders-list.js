"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const medusa_react_1 = require("medusa-react");
const ui_1 = require("@medusajs/ui");
const prepare_region_1 = __importDefault(require("../../../../utils/prepare-region"));
const prepare_shipping_options_1 = __importDefault(require("../../../../utils/prepare-shipping-options"));
const OrdersListNextjs = ({ isComplete, data }) => {
    const { product } = (0, medusa_react_1.useAdminProduct)(data.product_id);
    const { mutateAsync: createCart, isLoading: cartIsLoading } = (0, medusa_react_1.useCreateCart)();
    const { client } = (0, medusa_react_1.useMedusa)();
    const prepareNextjsCheckout = async () => {
        var _a, _b;
        const variant = (_a = product.variants[0]) !== null && _a !== void 0 ? _a : null;
        try {
            const regions = await (0, prepare_region_1.default)(client);
            await (0, prepare_shipping_options_1.default)(client, regions[0]);
            const { cart } = await createCart({
                region_id: (_b = regions[0]) === null || _b === void 0 ? void 0 : _b.id,
                items: [
                    {
                        variant_id: variant === null || variant === void 0 ? void 0 : variant.id,
                        quantity: 1
                    }
                ]
            });
            window.open(`http://localhost:8000/checkout?cart_id=${cart === null || cart === void 0 ? void 0 : cart.id}&onboarding=true`, "_blank");
        }
        catch (e) {
            console.error(e);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-6 flex flex-col gap-2", children: [(0, jsx_runtime_1.jsx)(ui_1.Text, { children: "The last step is to create a sample order using one of your products. You can then view your order\u2019s details, process its payment, fulfillment, inventory, and more." }), (0, jsx_runtime_1.jsx)(ui_1.Text, { children: "You can use the button below to experience hand-first the checkout flow in the Next.js storefront. After placing the order in the storefront, you\u2019ll be directed back here to view the order\u2019s details." })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex gap-2", children: !isComplete && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(ui_1.Button, { variant: "primary", size: "base", onClick: () => prepareNextjsCheckout(), isLoading: cartIsLoading, children: "Place an order in your storefront" }) })) })] }));
};
exports.default = OrdersListNextjs;
