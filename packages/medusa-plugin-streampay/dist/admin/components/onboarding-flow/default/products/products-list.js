"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const medusa_react_1 = require("medusa-react");
const ui_1 = require("@medusajs/ui");
const sample_products_1 = __importDefault(require("../../../../utils/sample-products"));
const prepare_region_1 = __importDefault(require("../../../../utils/prepare-region"));
const ProductsListDefault = ({ onNext, isComplete }) => {
    const { mutateAsync: createCollection, isLoading: collectionLoading } = (0, medusa_react_1.useAdminCreateCollection)();
    const { mutateAsync: createProduct, isLoading: productLoading } = (0, medusa_react_1.useAdminCreateProduct)();
    const { client } = (0, medusa_react_1.useMedusa)();
    const isLoading = (0, react_1.useMemo)(() => collectionLoading || productLoading, [collectionLoading, productLoading]);
    const createSample = async () => {
        try {
            const { collection } = await createCollection({
                title: "Merch",
                handle: "merch",
            });
            const regions = await (0, prepare_region_1.default)(client);
            const sampleProducts = (0, sample_products_1.default)({
                regions,
                collection_id: collection.id
            });
            const { product } = await createProduct(sampleProducts[0]);
            onNext(product);
        }
        catch (e) {
            console.error(e);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(ui_1.Text, { className: "mb-2", children: "Create a product and set its general details such as title and description, its price, options, variants, images, and more. You'll then use the product to create a sample order." }), (0, jsx_runtime_1.jsx)(ui_1.Text, { children: "You can create a product by clicking the \"New Product\" button below. Alternatively, if you're not ready to create your own product, we can create a sample one for you." }), !isComplete && ((0, jsx_runtime_1.jsx)("div", { className: "flex gap-2 mt-6", children: (0, jsx_runtime_1.jsx)(ui_1.Button, { variant: "primary", size: "base", onClick: () => createSample(), isLoading: isLoading, children: "Create sample product" }) }))] }));
};
exports.default = ProductsListDefault;
