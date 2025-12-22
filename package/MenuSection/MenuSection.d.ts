import { HTMLAttributes } from 'react';
export interface hdsMenuSectionProps {
    size?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
}
export interface MenuSectionProps extends HTMLAttributes<HTMLSpanElement> {
    hdsProps?: hdsMenuSectionProps | boolean;
}
export declare const MenuSection: import("react").ForwardRefExoticComponent<MenuSectionProps & import("react").RefAttributes<HTMLSpanElement>>;
export default MenuSection;
