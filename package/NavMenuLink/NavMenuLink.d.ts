import { HTMLAttributes } from 'react';
export interface hdsNavMenuLinkProps {
}
export interface NavMenuLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    hdsProps?: hdsNavMenuLinkProps | boolean;
}
export declare const NavMenuLink: import("react").ForwardRefExoticComponent<NavMenuLinkProps & import("react").RefAttributes<HTMLAnchorElement>>;
export default NavMenuLink;
