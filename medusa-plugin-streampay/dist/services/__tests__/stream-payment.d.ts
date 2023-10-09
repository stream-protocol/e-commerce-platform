import { AbstractPaymentService } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
declare class StreamPaymentService extends AbstractPaymentService {
    protected manager_: EntityManager;
    protected transactionManager_: EntityManager;
    private streamPaymentRepository;
    private daemonProviderUrl;
    private daemonProviderUser;
    private daemonProviderPassword;
    private merchantPaymentAddress;
    private daemon;
    private wallet;
    constructor({ streamPaymentRepository }: {
        streamPaymentRepository: any;
    }, options: any);
    private networks;
    private selectedNetwork;
    private connect;
}
export default StreamPaymentService;
