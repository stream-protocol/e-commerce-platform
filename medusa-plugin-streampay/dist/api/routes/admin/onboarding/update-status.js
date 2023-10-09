"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function updateOnboardingStatus(req, res) {
    const onboardingService = req.scope.resolve("onboardingService");
    const manager = req.scope.resolve("manager");
    const status = await manager.transaction(async (transactionManager) => {
        return await onboardingService
            .withTransaction(transactionManager)
            .update(req.body);
    });
    res.status(200).json({ status });
}
exports.default = updateOnboardingStatus;
