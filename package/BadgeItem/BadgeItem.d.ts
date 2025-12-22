import { HTMLAttributes } from 'react';
export interface hdsBadgeItemProps {
}
export interface BadgeItemProps extends HTMLAttributes<HTMLLIElement> {
    hdsProps?: hdsBadgeItemProps | boolean;
}
export declare const BadgeItem: import("react").ForwardRefExoticComponent<BadgeItemProps & import("react").RefAttributes<HTMLLIElement>>;
export default BadgeItem;
