/// <reference types="react" />
import { PopperProps as MuiPopperProps } from '@mui/material/Popper';
export interface hdsPopperProps {
}
export interface PopperProps extends Omit<MuiPopperProps, 'ref'> {
    hdsProps?: hdsPopperProps | boolean;
}
export declare const Popper: import("react").ForwardRefExoticComponent<PopperProps & import("react").RefAttributes<HTMLDivElement>>;
export default Popper;
