import { HTMLAttributes } from 'react';
export interface hdsDrawerContentProps {
    text?: React.ReactNode;
}
export interface DrawerContentProps extends HTMLAttributes<HTMLDivElement> {
    hdsProps?: hdsDrawerContentProps | boolean;
}
export declare const DrawerContent: import("react").ForwardRefExoticComponent<DrawerContentProps & import("react").RefAttributes<HTMLDivElement>>;
export default DrawerContent;
