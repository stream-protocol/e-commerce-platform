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
const OrdersListDefault = ({ onNext, isComplete, data }) => {
    const { product } = (0, medusa_react_1.useAdminProduct)(data.product_id);
    const { mutateAsync: createDraftOrder, isLoading } = (0, medusa_react_1.useAdminCreateDraftOrder)();
    const { client } = (0, medusa_react_1.useMedusa)();
    const createOrder = async () => {
        var _a;
        const variant = (_a = product.variants[0]) !== null && _a !== void 0 ? _a : null;
        try {
            // check if there is a shipping option and a region
            // and if not, create demo ones
            const regions = await (0, prepare_region_1.default)(client);
            const shipping_options = await (0, prepare_shipping_options_1.default)(client, regions[0]);
            const { draft_order } = await createDraftOrder({
                email: "customer@medusajs.com",
                items: [
                    variant
                        ? {
                            quantity: 1,
                            variant_id: variant === null || variant === void 0 ? void 0 : variant.id,
                        }
                        : {
                            quantity: 1,
                            title: product.title,
                            unit_price: 50,
                        },
                ],
                shipping_methods: [
                    {
                        option_id: shipping_options[0].id,
                    },
                ],
                region_id: regions[0].id,
            });
            const { order } = await client.admin.draftOrders.markPaid(draft_order.id);
            onNext(order);
        }
        catch (e) {
            console.error(e);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-6", children: [(0, jsx_runtime_1.jsx)(ui_1.Text, { className: "mb-2", children: "The last step is to create a sample order using the product you just created. You can then view your order\u2019s details, process its payment, fulfillment, inventory, and more." }), (0, jsx_runtime_1.jsx)(ui_1.Text, { children: "By clicking the \u201CCreate a Sample Order\u201D button, we\u2019ll generate an order using the product you created and default configurations." })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex gap-2", children: !isComplete && ((0, jsx_runtime_1.jsx)(ui_1.Button, { variant: "primary", size: "base", onClick: () => createOrder(), isLoading: isLoading, children: "Create a sample order" })) })] }));
};
exports.default = OrdersListDefault;
