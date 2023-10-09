import { StreamPayment } from "../models/stream-payment";
import { Repository } from "typeorm";
export declare class StreamPaymentRepository extends Repository<StreamPayment> {
    findByCartId(cartId: string): Promise<StreamPayment>;
}
