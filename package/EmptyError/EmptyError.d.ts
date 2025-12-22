import { HTMLAttributes } from 'react';
export interface hdsEmptyErrorProps {
    size?: 'small' | 'medium';
    icon?: 'icon' | 'image' | React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    buttons?: React.ReactNode[];
}
export interface EmptyErrorProps extends HTMLAttributes<HTMLDivElement> {
    hdsProps?: hdsEmptyErrorProps | boolean;
}
export declare const EmptyError: import("react").ForwardRefExoticComponent<EmptyErrorProps & import("react").RefAttributes<HTMLDivElement>>;
export default EmptyError;
