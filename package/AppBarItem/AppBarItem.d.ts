import { HTMLAttributes } from 'react';
export interface hdsAppBarItemProps {
}
export interface AppBarItemProps extends HTMLAttributes<HTMLLIElement> {
    hdsProps?: hdsAppBarItemProps | boolean;
}
export declare const AppBarItem: import("react").ForwardRefExoticComponent<AppBarItemProps & import("react").RefAttributes<HTMLLIElement>>;
export default AppBarItem;
