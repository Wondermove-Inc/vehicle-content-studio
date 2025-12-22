/// <reference types="react" />
import { DialogActionsProps as MuiDialogActionsProps } from '@mui/material/DialogActions';
export interface hdsDialogActionsProps {
    fitted?: boolean;
}
export interface DialogActionsProps extends Omit<MuiDialogActionsProps, 'ref'> {
    hdsProps?: hdsDialogActionsProps | boolean;
}
export declare const DialogActions: import("react").ForwardRefExoticComponent<DialogActionsProps & import("react").RefAttributes<HTMLElement>>;
export default DialogActions;
