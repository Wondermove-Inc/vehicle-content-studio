import { HTMLAttributes } from 'react';
export interface hdsAppBarListProps {
}
export interface AppBarListProps extends HTMLAttributes<HTMLUListElement> {
    hdsProps?: hdsAppBarListProps | boolean;
}
export declare const AppBarList: import("react").ForwardRefExoticComponent<AppBarListProps & import("react").RefAttributes<HTMLUListElement>>;
export default AppBarList;
