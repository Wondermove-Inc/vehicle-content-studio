import React, { HTMLAttributes } from 'react';
export interface hdsNavTitleProps {
    logo?: React.ReactNode;
    text?: React.ReactNode;
}
export interface NavTitleProps extends HTMLAttributes<HTMLAnchorElement> {
    hdsProps?: hdsNavTitleProps | boolean;
}
export declare const NavTitle: React.ForwardRefExoticComponent<NavTitleProps & React.RefAttributes<HTMLAnchorElement>>;
export default NavTitle;
