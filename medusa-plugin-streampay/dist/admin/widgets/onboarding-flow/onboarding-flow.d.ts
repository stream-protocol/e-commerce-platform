import { OrderDetailsWidgetProps, ProductDetailsWidgetProps, WidgetConfig, WidgetProps } from "@medusajs/admin";
import { OnboardingState } from "../../../models/onboarding";
type OnboardingWidgetProps = WidgetProps | ProductDetailsWidgetProps | OrderDetailsWidgetProps;
export type StepContentProps = OnboardingWidgetProps & {
    onNext?: Function;
    isComplete?: boolean;
    data?: OnboardingState;
};
declare const OnboardingFlow: (props: OnboardingWidgetProps) => import("react/jsx-runtime").JSX.Element;
export declare const config: WidgetConfig;
export default OnboardingFlow;
