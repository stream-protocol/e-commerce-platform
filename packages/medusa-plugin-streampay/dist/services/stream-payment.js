"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const medusa_1 = require("@medusajs/medusa");
const web3_js_1 = __importDefault(require("@solana/web3.js"));
class StreamPaymentService extends medusa_1.AbstractPaymentService {
    constructor({ streamPaymentRepository }, options) {
        super({
            streamPaymentRepository
        }, options);
        this.daemon = null;
        this.wallet = null;
        // Define Solana network configurations
        this.networks = {
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
                url: 'https://your-custom-rpc-url.com',
                label: 'Custom RPC',
            },
        };
        this.selectedNetwork = this.networks.devnet; // Choose the desired network here
        this.streamPaymentRepository = streamPaymentRepository;
        this.daemonProviderUrl = options.daemonProviderUrl;
        this.daemonProviderUser = options.daemonProviderUser;
        this.daemonProviderPassword = options.daemonProviderPassword;
        this.merchantPaymentAddress = options.merchantPaymentAddress;
    }
    // ...
    async connect() {
        if (this.daemon == null) {
            // connect to daemon using the selected network's URL
            this.daemon = await web3_js_1.default.connect(this.selectedNetwork.url);
            // ...
        }
    }
}
exports.default = StreamPaymentService;
