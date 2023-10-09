"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddOnboardingProduct1686062614694 = void 0;
class AddOnboardingProduct1686062614694 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "onboarding_state" ADD COLUMN "product_id" character varying NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "onboarding_state" DROP COLUMN "product_id"`);
    }
}
exports.AddOnboardingProduct1686062614694 = AddOnboardingProduct1686062614694;
