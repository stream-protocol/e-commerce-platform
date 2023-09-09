import { UsdcPayment } from "../models/usdc-payment";
import { EntityRepository, FindManyOptions, Repository } from "typeorm";
import { flatten, groupBy, map, merge } from "lodash";

@EntityRepository(UsdcPayment)
export class UsdcPaymentRepository extends Repository<UsdcPayment> {
    public async findByCartId(cartId: string): Promise<UsdcPayment> {
        return await this.findOne({
            where: {
                cart_id: cartId,
            },
        }
        );
    }
}