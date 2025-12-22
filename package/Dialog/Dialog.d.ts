/// <reference types="react" />
import { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
export interface hdsDialogProps {
    size?: 'small' | 'medium' | 'large';
    isScrollable?: boolean;
}
export interface DialogProps extends Omit<MuiDialogProps, 'ref'> {
    hdsProps?: hdsDialogProps | boolean;
}
export declare const Dialog: import("react").ForwardRefExoticComponent<DialogProps & import("react").RefAttributes<HTMLDivElement>>;
export default Dialog;
