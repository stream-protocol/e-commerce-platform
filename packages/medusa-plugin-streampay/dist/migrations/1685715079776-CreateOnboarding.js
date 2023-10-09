"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOnboarding1685715079776 = void 0;
const utils_1 = require("@medusajs/utils");
class CreateOnboarding1685715079776 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "onboarding_state" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "current_step" character varying NULL, "is_complete" boolean)`);
        await queryRunner.query(`INSERT INTO "onboarding_state" ("id", "current_step", "is_complete") VALUES ('${(0, utils_1.generateEntityId)("", "onboarding")}' , NULL, false)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "onboarding_state"`);
    }
}
exports.CreateOnboarding1685715079776 = CreateOnboarding1685715079776;
