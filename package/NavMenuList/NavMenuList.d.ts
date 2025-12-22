import { HTMLAttributes } from 'react';
export interface hdsNavMenuListProps {
}
export interface NavMenuListProps extends HTMLAttributes<HTMLUListElement> {
    hdsProps?: hdsNavMenuListProps | boolean;
}
export declare const NavMenuList: import("react").ForwardRefExoticComponent<NavMenuListProps & import("react").RefAttributes<HTMLUListElement>>;
export default NavMenuList;
