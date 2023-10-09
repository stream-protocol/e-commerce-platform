"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorrectOnboardingFields1690996567455 = void 0;
class CorrectOnboardingFields1690996567455 {
    constructor() {
        this.name = 'CorrectOnboardingFields1690996567455';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "onboarding_state" ADD CONSTRAINT "PK_891b72628471aada55d7b8c9410" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "onboarding_state" ALTER COLUMN "is_complete" SET NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "onboarding_state" ALTER COLUMN "is_complete" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "onboarding_state" DROP CONSTRAINT "PK_891b72628471aada55d7b8c9410"`);
    }
}
exports.CorrectOnboardingFields1690996567455 = CorrectOnboardingFields1690996567455;
