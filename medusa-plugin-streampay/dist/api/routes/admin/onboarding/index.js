"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/utils");
const express_1 = require("express");
const get_status_1 = __importDefault(require("./get-status"));
const update_status_1 = __importDefault(require("./update-status"));
const router = (0, express_1.Router)();
exports.default = (adminRouter) => {
    adminRouter.use("/onboarding", router);
    router.get("/", (0, utils_1.wrapHandler)(get_status_1.default));
    router.post("/", (0, utils_1.wrapHandler)(update_status_1.default));
};
