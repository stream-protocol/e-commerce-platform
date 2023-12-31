import { PaymentIntentDataByStatus } from "../__fixtures__/data"
import StreamPay from "streampay";
import { ErrorCodes, ErrorIntentStatus } from "../types";

export const WRONG_CUSTOMER_EMAIL = "wrong@test.fr"
export const EXISTING_CUSTOMER_EMAIL = "right@test.fr"
export const STREAMPAY_ID = "test"
export const PARTIALLY_FAIL_INTENT_ID = "partially_unknown"
export const FAIL_INTENT_ID = "unknown"

export const StreamPayMock = {
  paymentIntents: {
    retrieve: jest.fn().mockImplementation(async (paymentId) => {
      if (paymentId === FAIL_INTENT_ID) {
        throw new Error("Error")
      }

      return Object.values(PaymentIntentDataByStatus).find(value => {
        return value.id === paymentId
      }) ?? {}
    }),
    update: jest.fn().mockImplementation(async (paymentId, updateData) => {
      if (paymentId === FAIL_INTENT_ID) {
        throw new Error("Error")
      }

      const data = Object.values(PaymentIntentDataByStatus).find(value => {
        return value.id === paymentId
      }) ?? {}

      return { ...data, ...updateData }
    }),
    create: jest.fn().mockImplementation(async (data) => {
      if (data.description === "fail") {
        throw new Error("Error")
      }

      return data
    }),
    cancel: jest.fn().mockImplementation(async (paymentId) => {
      if (paymentId === FAIL_INTENT_ID) {
        throw new Error("Error")
      }

      if (paymentId === PARTIALLY_FAIL_INTENT_ID) {
        throw new StreamPay.errors.StreamPayError({
          code: ErrorCodes.PAYMENT_INTENT_UNEXPECTED_STATE,
          payment_intent: {
            id: paymentId,
            status: ErrorIntentStatus.CANCELED
          } as unknown as StreamPay.PaymentIntent,
          type: "invalid_request_error"
        })
      }

      return { id: paymentId }
    }),
    capture: jest.fn().mockImplementation(async (paymentId) => {
      if (paymentId === FAIL_INTENT_ID) {
        throw new Error("Error")
      }

      if (paymentId === PARTIALLY_FAIL_INTENT_ID) {
        throw new StreamPay.errors.StreamPayError({
          code: ErrorCodes.PAYMENT_INTENT_UNEXPECTED_STATE,
          payment_intent: {
            id: paymentId,
            status: ErrorIntentStatus.SUCCEEDED
          } as unknown as StreamPay.PaymentIntent,
          type: "invalid_request_error"
        })
      }

      return { id: paymentId }
    })
  },
  refunds: {
    create: jest.fn().mockImplementation(async ({  payment_intent: paymentId }) => {
      if (paymentId === FAIL_INTENT_ID) {
        throw new Error("Error")
      }

      return { id: paymentId }
    })
  },
  customers: {
    create: jest.fn().mockImplementation(async (data) => {
      if (data.email === EXISTING_CUSTOMER_EMAIL) {
        return { id: STREAMPAY_ID, ...data }
      }

      throw new Error("Error")
    })
  },
}

const streampay = jest.fn(() => StreamPayMock)

export default streampay