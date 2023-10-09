"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function prepareShippingOptions(client, region) {
    let { shipping_options } = await client.admin.shippingOptions.list();
    if (!shipping_options.length) {
        shipping_options = [(await client.admin.shippingOptions.create({
                "name": "PostFake Standard",
                "region_id": region.id,
                "provider_id": "manual",
                "data": {
                    "id": "manual-fulfillment"
                },
                "price_type": "flat_rate",
                "amount": 1000
            })).shipping_option];
    }
    return shipping_options;
}
exports.default = prepareShippingOptions;
