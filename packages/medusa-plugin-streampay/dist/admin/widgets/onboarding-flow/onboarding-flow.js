"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const medusa_react_1 = require("medusa-react");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const order_detail_1 = __importDefault(require("../../components/onboarding-flow/default/orders/order-detail"));
const orders_list_1 = __importDefault(require("../../components/onboarding-flow/default/orders/orders-list"));
const product_detail_1 = __importDefault(require("../../components/onboarding-flow/default/products/product-detail"));
const products_list_1 = __importDefault(require("../../components/onboarding-flow/default/products/products-list"));
const ui_1 = require("@medusajs/ui");
const accordion_1 = __importDefault(require("../../components/shared/accordion"));
const get_started_1 = __importDefault(require("../../components/shared/icons/get-started"));
const products_list_2 = __importDefault(require("../../components/onboarding-flow/nextjs/products/products-list"));
const product_detail_2 = __importDefault(require("../../components/onboarding-flow/nextjs/products/product-detail"));
const orders_list_2 = __importDefault(require("../../components/onboarding-flow/nextjs/orders/orders-list"));
const order_detail_2 = __importDefault(require("../../components/onboarding-flow/nextjs/orders/order-detail"));
const QUERY_KEY = ["onboarding_state"];
const OnboardingFlow = (props) => {
    var _a;
    // create custom hooks for custom endpoints
    const { data, isLoading } = (0, medusa_react_1.useAdminCustomQuery)("/onboarding", QUERY_KEY);
    const { mutate } = (0, medusa_react_1.useAdminCustomPost)("/onboarding", QUERY_KEY);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    // will be used if onboarding step
    // is passed as a path parameter
    const { client } = (0, medusa_react_1.useMedusa)();
    // get current step from custom endpoint
    const currentStep = (0, react_1.useMemo)(() => {
        var _a;
        return (_a = data === null || data === void 0 ? void 0 : data.status) === null || _a === void 0 ? void 0 : _a.current_step;
    }, [data]);
    // initialize some state
    const [openStep, setOpenStep] = (0, react_1.useState)(currentStep);
    const [completed, setCompleted] = (0, react_1.useState)(false);
    // this method is used to move from one step to the next
    const setStepComplete = ({ step_id, extraData, onComplete, }) => {
        const next = steps[findStepIndex(step_id) + 1];
        mutate({ current_step: next.id, ...extraData }, {
            onSuccess: onComplete
        });
    };
    // this is useful if you want to change the current step
    // using a path parameter. It can only be changed if the passed
    // step in the path parameter is the next step.
    const [searchParams] = (0, react_router_dom_1.useSearchParams)();
    // the steps are set based on the 
    // onboarding type
    const steps = (0, react_1.useMemo)(() => {
        {
            switch (process.env.MEDUSA_ADMIN_ONBOARDING_TYPE) {
                case 'nextjs':
                    return [
                        {
                            id: "create_product_nextjs",
                            title: "Create Products",
                            component: products_list_2.default,
                            onNext: (product) => {
                                setStepComplete({
                                    step_id: "create_product_nextjs",
                                    extraData: { product_id: product.id },
                                    onComplete: () => {
                                        if (!location.pathname.startsWith(`/a/products/${product.id}`)) {
                                            navigate(`/a/products/${product.id}`);
                                        }
                                    },
                                });
                            },
                        },
                        {
                            id: "preview_product_nextjs",
                            title: "Preview Product in your Next.js Storefront",
                            component: product_detail_2.default,
                            onNext: () => {
                                setStepComplete({
                                    step_id: "preview_product_nextjs",
                                    onComplete: () => navigate(`/a/orders`),
                                });
                            },
                        },
                        {
                            id: "create_order_nextjs",
                            title: "Create an Order using your Next.js Storefront",
                            component: orders_list_2.default,
                            onNext: (order) => {
                                setStepComplete({
                                    step_id: "create_order_nextjs",
                                    onComplete: () => {
                                        if (!location.pathname.startsWith(`/a/orders/${order.id}`)) {
                                            navigate(`/a/orders/${order.id}`);
                                        }
                                    },
                                });
                            },
                        },
                        {
                            id: "setup_finished_nextjs",
                            title: "Setup Finished: Continue Building your Ecommerce Store",
                            component: order_detail_2.default,
                        },
                    ];
                default:
                    return [
                        {
                            id: "create_product",
                            title: "Create Product",
                            component: products_list_1.default,
                            onNext: (product) => {
                                setStepComplete({
                                    step_id: "create_product",
                                    extraData: { product_id: product.id },
                                    onComplete: () => {
                                        if (!location.pathname.startsWith(`/a/products/${product.id}`)) {
                                            navigate(`/a/products/${product.id}`);
                                        }
                                    },
                                });
                            },
                        },
                        {
                            id: "preview_product",
                            title: "Preview Product",
                            component: product_detail_1.default,
                            onNext: () => {
                                setStepComplete({
                                    step_id: "preview_product",
                                    onComplete: () => navigate(`/a/orders`),
                                });
                            },
                        },
                        {
                            id: "create_order",
                            title: "Create an Order",
                            component: orders_list_1.default,
                            onNext: (order) => {
                                setStepComplete({
                                    step_id: "create_order",
                                    onComplete: () => {
                                        if (!location.pathname.startsWith(`/a/orders/${order.id}`)) {
                                            navigate(`/a/orders/${order.id}`);
                                        }
                                    },
                                });
                            },
                        },
                        {
                            id: "setup_finished",
                            title: "Setup Finished: Start developing with Medusa",
                            component: order_detail_1.default,
                        },
                    ];
            }
        }
    }, [location.pathname]);
    // used to retrieve the index of a step by its ID
    const findStepIndex = (0, react_1.useCallback)((step_id) => {
        return steps.findIndex((step) => step.id === step_id);
    }, [steps]);
    // used to check if a step is completed
    const isStepComplete = (0, react_1.useCallback)((step_id) => {
        return findStepIndex(currentStep) > findStepIndex(step_id);
    }, [findStepIndex, currentStep]);
    // this is used to retrieve the data necessary
    // to move to the next onboarding step
    const getOnboardingParamStepData = (0, react_1.useCallback)(async (onboardingStep, data) => {
        switch (onboardingStep) {
            case "setup_finished_nextjs":
            case "setup_finished":
                if (!(data === null || data === void 0 ? void 0 : data.orderId) && "order" in props) {
                    return props.order;
                }
                const orderId = (data === null || data === void 0 ? void 0 : data.orderId) || searchParams.get("order_id");
                if (orderId) {
                    return (await client.admin.orders.retrieve(orderId)).order;
                }
                throw new Error("Required `order_id` parameter was not passed as a parameter");
            case "preview_product_nextjs":
            case "preview_product":
                if (!(data === null || data === void 0 ? void 0 : data.productId) && "product" in props) {
                    return props.product;
                }
                const productId = (data === null || data === void 0 ? void 0 : data.productId) || searchParams.get("product_id");
                if (productId) {
                    return (await client.admin.products.retrieve(productId)).product;
                }
                throw new Error("Required `product_id` parameter was not passed as a parameter");
            default:
                return undefined;
        }
    }, [searchParams, props]);
    const isProductCreateStep = (0, react_1.useMemo)(() => {
        return currentStep === "create_product" ||
            currentStep === "create_product_nextjs";
    }, [currentStep]);
    const isOrderCreateStep = (0, react_1.useMemo)(() => {
        return currentStep === "create_order" ||
            currentStep === "create_order_nextjs";
    }, [currentStep]);
    // used to change the open step when the current
    // step is retrieved from custom endpoints
    (0, react_1.useEffect)(() => {
        setOpenStep(currentStep);
        if (findStepIndex(currentStep) === steps.length - 1)
            setCompleted(true);
    }, [currentStep, findStepIndex]);
    // used to check if the user created a product and has entered its details page
    // the step is changed to the next one
    (0, react_1.useEffect)(() => {
        var _a, _b;
        if (location.pathname.startsWith("/a/products/prod_") && isProductCreateStep && "product" in props) {
            // change to the preview product step
            const currentStepIndex = findStepIndex(currentStep);
            (_b = (_a = steps[currentStepIndex]).onNext) === null || _b === void 0 ? void 0 : _b.call(_a, props.product);
        }
    }, [location.pathname, isProductCreateStep]);
    // used to check if the user created an order and has entered its details page
    // the step is changed to the next one.
    (0, react_1.useEffect)(() => {
        var _a, _b;
        if (location.pathname.startsWith("/a/orders/order_") && isOrderCreateStep && "order" in props) {
            // change to the preview product step
            const currentStepIndex = findStepIndex(currentStep);
            (_b = (_a = steps[currentStepIndex]).onNext) === null || _b === void 0 ? void 0 : _b.call(_a, props.order);
        }
    }, [location.pathname, isOrderCreateStep]);
    // used to check if the `onboarding_step` path
    // parameter is passed and, if so, moves to that step
    // only if it's the next step and its necessary data is passed
    (0, react_1.useEffect)(() => {
        const onboardingStep = searchParams.get("onboarding_step");
        const onboardingStepIndex = findStepIndex(onboardingStep);
        if (onboardingStep && onboardingStepIndex !== -1 && onboardingStep !== openStep) {
            // change current step to the onboarding step
            const openStepIndex = findStepIndex(openStep);
            if (onboardingStepIndex !== openStepIndex + 1) {
                // can only go forward one step
                return;
            }
            // retrieve necessary data and trigger the next function
            getOnboardingParamStepData(onboardingStep)
                .then((data) => {
                var _a, _b;
                (_b = (_a = steps[openStepIndex]).onNext) === null || _b === void 0 ? void 0 : _b.call(_a, data);
            })
                .catch((e) => console.error(e));
        }
    }, [searchParams, openStep, getOnboardingParamStepData]);
    if (!isLoading &&
        ((_a = data === null || data === void 0 ? void 0 : data.status) === null || _a === void 0 ? void 0 : _a.is_complete) &&
        !localStorage.getItem("override_onboarding_finish"))
        return null;
    // a method that will be triggered when
    // the setup is started
    const onStart = () => {
        mutate({ current_step: steps[0].id });
        navigate(`/a/products`);
    };
    // a method that will be triggered when
    // the setup is completed
    const onComplete = () => {
        setCompleted(true);
    };
    // a method that will be triggered when
    // the setup is closed
    const onHide = () => {
        mutate({ is_complete: true });
    };
    // used to get text for get started header
    const getStartedText = () => {
        switch (process.env.MEDUSA_ADMIN_ONBOARDING_TYPE) {
            case "nextjs":
                return "Learn the basics of Medusa by creating your first order using the Next.js storefront.";
            default:
                return "Learn the basics of Medusa by creating your first order.";
        }
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(ui_1.Container, { className: (0, ui_1.clx)("text-ui-fg-subtle px-0 pt-0 pb-4", {
                "mb-4": completed
            }), children: (0, jsx_runtime_1.jsxs)(accordion_1.default, { type: "single", value: openStep, onValueChange: (value) => setOpenStep(value), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, ui_1.clx)("flex py-6 px-8", {
                            "items-start": completed,
                            "items-center": !completed
                        }), children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 p-1 flex justify-center items-center rounded-full bg-ui-bg-base shadow-elevation-card-rest mr-4", children: (0, jsx_runtime_1.jsx)(get_started_1.default, {}) }), !completed ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(ui_1.Heading, { level: "h1", className: "text-ui-fg-base", children: "Get started" }), (0, jsx_runtime_1.jsx)(ui_1.Text, { children: getStartedText() })] }), (0, jsx_runtime_1.jsx)("div", { className: "ml-auto flex items-start gap-2", children: !!currentStep ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: currentStep === steps[steps.length - 1].id ? ((0, jsx_runtime_1.jsx)(ui_1.Button, { variant: "primary", size: "base", onClick: () => onComplete(), children: "Complete Setup" })) : ((0, jsx_runtime_1.jsx)(ui_1.Button, { variant: "secondary", size: "base", onClick: () => onHide(), children: "Cancel Setup" })) })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ui_1.Button, { variant: "secondary", size: "base", onClick: () => onHide(), children: "Close" }), (0, jsx_runtime_1.jsx)(ui_1.Button, { variant: "primary", size: "base", onClick: () => onStart(), children: "Begin setup" })] })) })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(ui_1.Heading, { level: "h1", className: "text-ui-fg-base", children: "Thank you for completing the setup guide!" }), (0, jsx_runtime_1.jsxs)(ui_1.Text, { children: ["This whole experience was built using our new", " ", (0, jsx_runtime_1.jsx)("strong", { children: "widgets" }), " feature.", (0, jsx_runtime_1.jsx)("br", {}), " You can find out more details and build your own by following", " ", (0, jsx_runtime_1.jsx)("a", { href: "https://docs.medusajs.com/admin/onboarding?ref=onboarding", target: "_blank", className: "text-blue-500 font-semibold", children: "our guide" }), "."] })] }), (0, jsx_runtime_1.jsx)("div", { className: "ml-auto flex items-start gap-2", children: (0, jsx_runtime_1.jsx)(ui_1.Button, { variant: "secondary", size: "base", onClick: () => onHide(), children: "Close" }) })] }))] }), (0, jsx_runtime_1.jsx)("div", { children: (!completed ? steps : steps.slice(-1)).map((step) => {
                            const isComplete = isStepComplete(step.id);
                            const isCurrent = currentStep === step.id;
                            return ((0, jsx_runtime_1.jsx)(accordion_1.default.Item, { title: step.title, value: step.id, headingSize: "medium", active: isCurrent, complete: isComplete, disabled: !isComplete && !isCurrent, ...(!isComplete &&
                                    !isCurrent && {
                                    customTrigger: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}),
                                }), children: (0, jsx_runtime_1.jsx)("div", { className: "pl-14 pb-6 pr-7", children: (0, jsx_runtime_1.jsx)(step.component, { onNext: step.onNext, isComplete: isComplete, data: data === null || data === void 0 ? void 0 : data.status, ...props }) }) }, step.id));
                        }) })] }) }) }));
};
exports.config = {
    zone: [
        "product.list.before",
        "product.details.before",
        "order.list.before",
        "order.details.before",
    ],
};
exports.default = OnboardingFlow;
