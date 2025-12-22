import { HTMLAttributes } from 'react';
export interface hdsFooterButtonListrops {
}
export interface FooterButtonListrops extends HTMLAttributes<HTMLUListElement> {
    hdsProps?: hdsFooterButtonListrops | boolean;
}
export declare const FooterButtonList: import("react").ForwardRefExoticComponent<FooterButtonListrops & import("react").RefAttributes<HTMLUListElement>>;
export default FooterButtonList;
