import { HTMLAttributes } from 'react';
import { ThemeType } from '../stores';
export interface hdsLogoProps {
    type?: ThemeType;
    isSurface?: boolean;
}
export interface LogoProps extends HTMLAttributes<HTMLImageElement> {
    hdsProps?: hdsLogoProps | boolean;
}
export declare const Logo: import("react").ForwardRefExoticComponent<LogoProps & import("react").RefAttributes<HTMLImageElement>>;
export default Logo;
