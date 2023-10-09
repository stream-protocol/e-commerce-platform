import * as AccordionPrimitive from "@radix-ui/react-accordion";
import React from "react";
type AccordionItemProps = AccordionPrimitive.AccordionItemProps & {
    title: string;
    subtitle?: string;
    description?: string;
    required?: boolean;
    tooltip?: string;
    forceMountContent?: true;
    headingSize?: "small" | "medium" | "large";
    customTrigger?: React.ReactNode;
    complete?: boolean;
    active?: boolean;
    triggerable?: boolean;
};
declare const Accordion: React.FC<(AccordionPrimitive.AccordionSingleProps & React.RefAttributes<HTMLDivElement>) | (AccordionPrimitive.AccordionMultipleProps & React.RefAttributes<HTMLDivElement>)> & {
    Item: React.FC<AccordionItemProps>;
};
export default Accordion;
