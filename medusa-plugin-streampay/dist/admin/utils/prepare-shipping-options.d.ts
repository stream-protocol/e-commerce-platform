import { Region } from "@medusajs/medusa";
import type Medusa from "@medusajs/medusa-js";
export default function prepareShippingOptions(client: Medusa, region: Region): Promise<import("@medusajs/medusa").ShippingOption[]>;
