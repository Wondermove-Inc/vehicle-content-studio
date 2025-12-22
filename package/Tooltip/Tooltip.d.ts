/// <reference types="react" />
import { TooltipProps as MuiTooltipProps, TooltipClasses as MuiTooltipClasses } from '@mui/material/Tooltip';
export interface hdsTooltipProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
}
export interface TooltipProps extends Omit<MuiTooltipProps, 'ref' | 'title'> {
    hdsProps?: hdsTooltipProps | boolean;
    title?: React.ReactNode;
}
export interface TooltipClasses extends MuiTooltipClasses {
}
export declare const Tooltip: import("react").ForwardRefExoticComponent<TooltipProps & import("react").RefAttributes<HTMLElement>>;
export default Tooltip;
