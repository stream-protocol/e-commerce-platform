import { AbstractPaymentService, Cart, Data, Payment, PaymentSession, PaymentSessionStatus, TransactionBaseService } from "@medusajs/medusa"
import { EntityManager } from "typeorm";
import streamjs from "stream-payments-javascript";
import { UsdcPayment } from "../models/usdc-payment";
import { UsdcPaymentRepository } from "../repositories/usdc-payment";


class UsdcPaymentService extends AbstractPaymentService {
    protected manager_: EntityManager;
    protected transactionManager_: EntityManager;

    private streamPaymentRepository: UsdcPaymentRepository;

    private daemonProviderUrl: string;
    private daemonProviderUser: string;
    private daemonProviderPassword: string;
    private merchantPaymentAddress: string;

    private daemon: any = null;
    private wallet: any = null;

    constructor(
        {
            usdcPaymentRepository
        },
        options
    ) {
        super(
            {
                usdcPaymentRepository
            },
            options
        );

        this.usdcPaymentRepository = usdcPaymentRepository;
        this.daemonProviderUrl = options.daemonProviderUrl;
        this.daemonProviderUser = options.daemonProviderUser;
        this.daemonProviderPassword = options.daemonProviderPassword;
        this.merchantPaymentAddress = options.merchantPaymentAddress;
    }

    private async connect() {
        if (this.daemon == null) {
            // connect to daemon
            this.daemon = await streamjs.connectToDaemonRpc(
                this.daemonProviderUrl,
                this.daemonProviderUser,
                this.daemonProviderPassword
            );

            // https://github.com/stream-protocol/stream-payments-javascript/blob/payment-gateway/docs/developer_guide/getting_started.md
            this.wallet = await streamjs.createWalletKeys({
                networkType: "mainnet", // TODO: Allow test mode
            });
        }
    }

    async getPaymentData(paymentSession: PaymentSession): Promise<Data> {
        await this.connect();

        const streamPayment = new UsdcPayment();
        usdcPayment.cart_id = paymentSession.cart_id;
        usdcPayment.total_amount = paymentSession.cart.total!;
        usdcPayment.user_email = paymentSession.cart.email;
        usdcPayment.virtual_wallet_addr = this.wallet.getAddress(0, 0);
        usdcPayment.virtual_wallet_pkey = this.wallet.getPrivateSpendKey();
        usdcPayment.virtual_wallet_vkey = this.wallet.getPrivateViewKey();
        await this.streamPaymentRepository.save(streamPayment);

        return {
            "paymentAddress": streamPayment.virtual_wallet_addr
        };
    }
    async updatePaymentData(paymentSessionData: Data, data: Data): Promise<Data> {
        await this.connect();

        throw new Error("Method not implemented.");
    }
    async createPayment(cart: Cart): Promise<Data> {
        await this.connect();

        throw new Error("Method not implemented.");
    }
    async retrievePayment(paymentData: Data): Promise<Data> {
        await this.connect();

        throw new Error("Method not implemented.");
    }
    async updatePayment(paymentSessionData: Data, cart: Cart): Promise<Data> {
        await this.connect();

        throw new Error("Method not implemented.");
    }
    async authorizePayment(paymentSession: PaymentSession, context: Data): Promise<{ data: Data; status: PaymentSessionStatus; }> {
        await this.connect();

        throw new Error("Method not implemented.");
    }
    async capturePayment(payment: Payment): Promise<Data> {
        await this.connect();

        throw new Error("Method not implemented.");
    }
    async refundPayment(payment: Payment, refundAmount: number): Promise<Data> {
        await this.connect();

        throw new Error("Method not implemented.");
    }
    async cancelPayment(payment: Payment): Promise<Data> {
        await this.connect();

        throw new Error("Method not implemented.");
    }
    async deletePayment(paymentSession: PaymentSession): Promise<void> {
        await this.connect();

        throw new Error("Method not implemented.");
    }
    async getStatus(data: Data): Promise<PaymentSessionStatus> {
        await this.connect();

        throw new Error("Method not implemented.");
    }

}

export default usdcPaymentService;