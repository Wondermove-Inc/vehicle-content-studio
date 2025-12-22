import { HTMLAttributes } from 'react';
export interface hdsNavMenuItemProps {
    isSelected?: boolean;
}
export interface NavMenuItemProps extends HTMLAttributes<HTMLLIElement> {
    hdsProps?: hdsNavMenuItemProps | boolean;
}
export declare const NavMenuItem: import("react").ForwardRefExoticComponent<NavMenuItemProps & import("react").RefAttributes<HTMLLIElement>>;
export default NavMenuItem;
