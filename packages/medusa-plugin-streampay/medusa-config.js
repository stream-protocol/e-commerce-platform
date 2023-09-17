const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS =
  process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-store";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "uploads",
    },
  },
  {
    resolve: "@medusajs/admin",
    options: {
      autoRebuild: true,
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
      },
    },
  },
  {
    // Add your StreamPay plugin configuration here
    resolve: `medusa-plugin-streampay`,
    options: {
      // Other StreamPay plugin options. StreamPayments Merchant Portal.
      enableUI: true,
    },
  },
];

const modules = {
  // Add your eventBus and cacheService configurations here if needed
};

const projectConfig = {
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  store_cors: STORE_CORS,
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS,
  // Uncomment the following lines to enable REDIS
  // redis_url: REDIS_URL
  // Add your additional project configurations here
  StreamPay_Merchant_Portal_API: process.env.STREAMPAY_MERCHANT_PORTAL_API,
  Merchant_Wallet: process.env.MERCHANT_WALLET_ADDRESS,
  //Merchant_TAX_ID: process.env.MERCHANT_TAX_API_KEY,
  //Merchant_TAX_Wallet: process.env.MERCHANT_TAX_WALLET_ADDRESS,
  Fee_Wallet: process.env.MERCHANT_FEE_WALLET_ADDRESS,
  Donate_wallet: process.env.DONATE_WALLET_ADDRESS,
  StreamPay_Medusa_API_KEY: process.env.STREAMPAY_MEDUSA_API_KEY,
};

module.exports = {
  projectConfig,
  plugins,
  modules,
};
