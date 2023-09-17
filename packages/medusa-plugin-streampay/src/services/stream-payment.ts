import { AbstractPaymentService, Cart, Data, Payment, PaymentSession, PaymentSessionStatus, TransactionBaseService } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import solanajs from "@solana/web3.js";
import { StreamPayment } from "../models/stream-payment";
import { StreamPaymentRepository } from "../repositories/stream-payment";

class StreamPaymentService extends AbstractPaymentService {
    protected manager_: EntityManager;
    protected transactionManager_: EntityManager;

    private streamPaymentRepository: StreamPaymentRepository;

    private daemonProviderUrl: string;
    private daemonProviderUser: string;
    private daemonProviderPassword: string;
    private merchantPaymentAddress: string;

    private daemon: any = null;
    private wallet: any = null;

    constructor(
        {
            streamPaymentRepository
        },
        options
    ) {
        super(
            {
                streamPaymentRepository
            },
            options
        );

        this.streamPaymentRepository = streamPaymentRepository;
        this.daemonProviderUrl = options.daemonProviderUrl;
        this.daemonProviderUser = options.daemonProviderUser;
        this.daemonProviderPassword = options.daemonProviderPassword;
        this.merchantPaymentAddress = options.merchantPaymentAddress;
    }

    // Define Solana network configurations
    private networks = {
        devnet: {
            url: 'https://api.devnet.solana.com',
            label: 'Devnet',
        },
        mainnet: {
            url: 'https://api.mainnet.solana.com',
            label: 'Mainnet',
        },
        testnet: {
            url: 'https://api.testnet.solana.com',
            label: 'Testnet',
        },
        testnetCurrent: {
            url: 'https://testnet.solana.com',
            label: 'Testnet Current',
        },
        customRPC: {
            url: 'https://your-custom-rpc-url.com', // Replace with your custom RPC URL
            label: 'Custom RPC',
        },
    };

    private selectedNetwork = this.networks.devnet; // Choose the desired network here

    // ...

    private async connect() {
        if (this.daemon == null) {
            // connect to daemon using the selected network's URL
            this.daemon = await solanajs.connect(this.selectedNetwork.url);

            // ...
        }
    }

    // ...
}

export default StreamPaymentService;