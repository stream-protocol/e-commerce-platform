"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getOnboardingStatus(req, res) {
    const onboardingService = req.scope.resolve("onboardingService");
    const status = await onboardingService.retrieve();
    res.status(200).json({ status });
}
exports.default = getOnboardingStatus;
