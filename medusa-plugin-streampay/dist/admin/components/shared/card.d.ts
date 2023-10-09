/// <reference types="react" />
type CardProps = {
    icon?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
};
declare const Card: ({ icon, children, className }: CardProps) => import("react/jsx-runtime").JSX.Element;
export default Card;
