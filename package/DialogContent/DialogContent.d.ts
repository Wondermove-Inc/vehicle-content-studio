/// <reference types="react" />
import { DialogContentProps as MuiDialogContentProps } from '@mui/material/DialogContent';
export interface hdsDialogContentProps {
}
export interface DialogContentProps extends Omit<MuiDialogContentProps, 'ref'> {
    hdsProps?: hdsDialogContentProps | boolean;
}
export declare const DialogContent: import("react").ForwardRefExoticComponent<DialogContentProps & import("react").RefAttributes<HTMLElement>>;
export default DialogContent;
