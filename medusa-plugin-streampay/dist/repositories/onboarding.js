"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("@medusajs/medusa/dist/loaders/database");
const onboarding_1 = require("../models/onboarding");
const OnboardingRepository = database_1.dataSource.getRepository(onboarding_1.OnboardingState);
exports.default = OnboardingRepository;
