"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function prepareRegions(client) {
    let { regions } = await client.admin.regions.list();
    if (!regions.length) {
        let { store } = await client.admin.store.retrieve();
        if (!store.currencies) {
            store = (await client.admin.store.update({
                currencies: ["eur"]
            })).store;
        }
        regions = [(await client.admin.regions.create(getSampleRegion(store))).region];
    }
    return regions;
}
exports.default = prepareRegions;
function getSampleRegion(store) {
    return {
        name: "EU",
        currency_code: store.currencies[0].code,
        tax_rate: 0,
        payment_providers: [
            "manual"
        ],
        fulfillment_providers: [
            "manual"
        ],
        countries: [
            "gb",
            "de",
            "dk",
            "se",
            "fr",
            "es",
            "it"
        ]
    };
}
