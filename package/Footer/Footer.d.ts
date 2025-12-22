import React, { HTMLAttributes } from 'react';
export interface hdsFooterProps {
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    survice?: React.ReactNode;
    copyright?: string;
}
export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
    hdsProps?: hdsFooterProps | boolean;
}
export declare const Footer: React.ForwardRefExoticComponent<FooterProps & React.RefAttributes<HTMLDivElement>>;
export default Footer;
