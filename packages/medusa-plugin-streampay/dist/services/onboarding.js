"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const medusa_1 = require("@medusajs/medusa");
const typeorm_1 = require("typeorm");
class OnboardingService extends medusa_1.TransactionBaseService {
    constructor({ onboardingRepository }) {
        super(arguments[0]);
        this.onboardingRepository_ = onboardingRepository;
    }
    async retrieve() {
        const onboardingRepo = this.activeManager_.withRepository(this.onboardingRepository_);
        const status = await onboardingRepo.findOne({
            where: { id: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) },
        });
        return status;
    }
    async update(data) {
        return await this.atomicPhase_(async (transactionManager) => {
            const onboardingRepository = transactionManager.withRepository(this.onboardingRepository_);
            const status = await this.retrieve();
            for (const [key, value] of Object.entries(data)) {
                status[key] = value;
            }
            return await onboardingRepository.save(status);
        });
    }
}
exports.default = OnboardingService;
