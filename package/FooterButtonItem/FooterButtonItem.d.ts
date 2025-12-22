import { HTMLAttributes } from 'react';
export interface hdsFooterButtonItemProps {
}
export interface FooterButtonItemProps extends HTMLAttributes<HTMLLIElement> {
    hdsProps?: hdsFooterButtonItemProps | boolean;
}
export declare const FooterButtonItem: import("react").ForwardRefExoticComponent<FooterButtonItemProps & import("react").RefAttributes<HTMLLIElement>>;
export default FooterButtonItem;
