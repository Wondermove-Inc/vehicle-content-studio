import { HTMLAttributes } from 'react';
export interface hdsAppBarTitleProps {
}
export interface AppBarTitleProps extends HTMLAttributes<HTMLDivElement> {
    hdsProps?: hdsAppBarTitleProps | boolean;
}
export declare const AppBarTitle: import("react").ForwardRefExoticComponent<AppBarTitleProps & import("react").RefAttributes<HTMLDivElement>>;
export default AppBarTitle;
