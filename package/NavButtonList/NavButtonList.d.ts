import { HTMLAttributes } from 'react';
export interface hdsNavButtonListProps {
}
export interface NavButtonListProps extends HTMLAttributes<HTMLUListElement> {
    hdsProps?: hdsNavButtonListProps | boolean;
}
export declare const NavButtonList: import("react").ForwardRefExoticComponent<NavButtonListProps & import("react").RefAttributes<HTMLUListElement>>;
export default NavButtonList;
