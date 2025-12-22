import { HTMLAttributes } from 'react';
export interface hdsBadgeListrops {
}
export interface BadgeListrops extends HTMLAttributes<HTMLUListElement> {
    hdsProps?: hdsBadgeListrops | boolean;
}
export declare const BadgeList: import("react").ForwardRefExoticComponent<BadgeListrops & import("react").RefAttributes<HTMLUListElement>>;
export default BadgeList;
