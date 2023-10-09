"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const medusa_react_1 = require("medusa-react");
const ui_1 = require("@medusajs/ui");
const sample_products_1 = __importDefault(require("../../../../utils/sample-products"));
const prepare_region_1 = __importDefault(require("../../../../utils/prepare-region"));
const ProductsListNextjs = ({ onNext, isComplete }) => {
    const { mutateAsync: createCollection, isLoading: collectionLoading } = (0, medusa_react_1.useAdminCreateCollection)();
    const { mutateAsync: createProduct, isLoading: productLoading } = (0, medusa_react_1.useAdminCreateProduct)();
    const { client } = (0, medusa_react_1.useMedusa)();
    const isLoading = collectionLoading || productLoading;
    const createSample = async () => {
        try {
            const { collection } = await createCollection({
                title: "Merch",
                handle: "merch",
            });
            const regions = await (0, prepare_region_1.default)(client);
            const tryCreateProduct = async (sampleProduct) => {
                try {
                    return (await createProduct(sampleProduct)).product;
                }
                catch {
                    // ignore if product already exists
                    return null;
                }
            };
            let product;
            const sampleProducts = (0, sample_products_1.default)({
                regions,
                collection_id: collection.id
            });
            await Promise.all(sampleProducts.map(async (sampleProduct, index) => {
                const createdProduct = await tryCreateProduct(sampleProduct);
                if (index === 0 && createProduct) {
                    product = createdProduct;
                }
            }));
            onNext(product);
        }
        catch (e) {
            console.error(e);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(ui_1.Text, { className: "mb-2", children: "Products is Medusa represent the products you sell. You can set their general details including a title and description. Each product has options and variants, and you can set a price for each variant." }), (0, jsx_runtime_1.jsx)(ui_1.Text, { children: "Click the button below to create sample products." }), !isComplete && ((0, jsx_runtime_1.jsx)("div", { className: "flex gap-2 mt-6", children: (0, jsx_runtime_1.jsx)(ui_1.Button, { variant: "primary", size: "base", onClick: () => createSample(), isLoading: isLoading, children: "Create sample products" }) }))] }));
};
exports.default = ProductsListNextjs;
