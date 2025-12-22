/// <reference types="react" />
import { PopoverProps as MuiPopoverProps } from '@mui/material/Popover';
export interface hdsPopoverProps {
}
export interface PopoverProps extends Omit<MuiPopoverProps, 'ref'> {
    hdsProps?: hdsPopoverProps | boolean;
}
export { default as popoverClasses } from '@mui/material/Popover/popoverClasses';
export * from '@mui/material/Popover/popoverClasses';
export declare const Popover: import("react").ForwardRefExoticComponent<PopoverProps & import("react").RefAttributes<HTMLDivElement>>;
export default Popover;
