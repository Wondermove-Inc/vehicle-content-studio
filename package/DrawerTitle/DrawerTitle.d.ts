import { HTMLAttributes } from 'react';
export interface hdsDrawerTitleProps {
    title?: React.ReactNode;
}
export interface DrawerTitleProps extends HTMLAttributes<HTMLDivElement> {
    hdsProps?: hdsDrawerTitleProps | boolean;
}
export declare const DrawerTitle: import("react").ForwardRefExoticComponent<DrawerTitleProps & import("react").RefAttributes<HTMLDivElement>>;
export default DrawerTitle;
