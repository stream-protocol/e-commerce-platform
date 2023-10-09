import { AdminPostProductsReq, Region } from "@medusajs/medusa";
type SampleProductsOptions = {
    regions: Region[];
    collection_id?: string;
};
export default function getSampleProducts({ regions, collection_id }: SampleProductsOptions): AdminPostProductsReq[];
export {};
