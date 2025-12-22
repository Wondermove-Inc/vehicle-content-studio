import { HTMLAttributes } from 'react';
export interface hdsNavigationProps {
    isSurface?: boolean;
    action?: React.ReactNode;
    avatar?: React.ReactNode;
}
export interface NavigationProps extends HTMLAttributes<HTMLDivElement> {
    hdsProps?: hdsNavigationProps | boolean;
}
export declare const Navigation: import("react").ForwardRefExoticComponent<NavigationProps & import("react").RefAttributes<HTMLDivElement>>;
export default Navigation;
