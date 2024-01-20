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
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost/medusa-starter-default";

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
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      autoRebuild: true,
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
      },
    },
  },
  {
    resolve: `medusa-payment-stripe`,
    options: {
      api_key: process.env.STRIPE_API_KEY,
      webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
    },
  },

  {
    resolve: `medusa-payment-paypal`,
    options: {
      sandbox: process.env.PAYPAL_SANDBOX,
      clientId: process.env.PAYPAL_CLIENT_ID,
      clientSecret: process.env.PAYPAL_CLIENT_SECRET,
      authWebhookId: process.env.PAYPAL_AUTH_WEBHOOK_ID,
    },
  },
  {
    resolve: `medusa-plugin-algolia`,
    options: {
      applicationId: process.env.ALGOLIA_APP_ID,
      adminApiKey: process.env.ALGOLIA_ADMIN_API_KEY,
      settings: {
        products: {
          indexSettings: {
            searchableAttributes: ["title"],
            attributesToRetrieve: ["id", "title", "handle", "thumbnail", "images", "collection_title", "metadata", "tags"],
          },

          transformer: (product) => {
            return {
              objectID: product.id,
              id: product.id,
              title: product.title,
              handle: product.handle,
              thumbnail: product.thumbnail,
              collection_title: product.collection && product.collection.title ? product.collection.title : null,
              metadata: product.metadata,
              tags: product.tags,
              images: product.images,
            };
          },
        },
      },
    },
  },

  // {
  // resolve: `medusa-plugin-resend`,
  //    options: {
  //       api_key: process.env.RESEND_API_ID,
  //       from: process.env.SES_FROM,
  //       // enable_endpoint: process.env.SES_ENABLE_ENDPOINT,
  //       template_path: process.env.SES_TEMPLATE_PATH,
  //       subject_template_type: process.env.RESEND_SUBJECT_TEMPLATE_TYPE,
  //       body_template_type: process.env.RESEND_BODY_TEMPLATE_TYPE,
  //       order_placed_template: 'order_placed',
  //       order_shipped_template: 'order_shipped',
  //       customer_password_reset_template: 'customer_password_reset',
  //       gift_card_created_template: 'gift_card_created',
  //       //order_canceled_template: 'order_canceled',
  //       //order_refund_created_template: 'order_refund_created',
  //       //order_return_requested_template: 'order_return_requested',
  //       //order_items_returned_template: 'order_items_returned',
  //       //swap_created_template: 'swap_created',
  //       //swap_shipment_created_template: 'swap_shipment_created',
  //       //swap_received_template: 'swap_received',
  //       //claim_shipment_created_template: 'claim_shipment_created',
  //       //user_password_reset_template: 'user_password_reset',
  //       //medusa_restock_template: 'medusa_restock',
  //    }
  // },

  {
    resolve: `medusa-plugin-segment`,
    options: {
      write_key: process.env.SEGMENT_WRITE_KEY,
    },
  },

  // {
  //     resolve: `medusa-plugin-twilio-sms`,
  //     options: {
  //       account_sid: process.env.TWILIO_SMS_ACCOUNT_SID,
  //       auth_token: process.env.TWILIO_SMS_AUTH_TOKEN,
  //       from_number: process.env.TWILIO_SMS_FROM_NUMBER,
  //     },
  //   },
];

const modules = {
  eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL,
    },
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL,
    },
  },
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  store_cors: STORE_CORS,
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS,
  database_extra: { ssl: { rejectUnauthorized: false } },
  // Uncomment the following lines to enable REDIS
  redis_url: REDIS_URL,
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
};