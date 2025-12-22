import { HTMLAttributes } from 'react';
export interface hdsNavButtonItemProps {
}
export interface NavButtonItemProps extends HTMLAttributes<HTMLLIElement> {
    hdsProps?: hdsNavButtonItemProps | boolean;
}
export declare const NavButtonItem: import("react").ForwardRefExoticComponent<NavButtonItemProps & import("react").RefAttributes<HTMLLIElement>>;
export default NavButtonItem;
