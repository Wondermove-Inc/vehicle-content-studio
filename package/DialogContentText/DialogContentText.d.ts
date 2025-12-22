import { DialogContentTextTypeMap, DialogContentTextProps as MuiDialogContentTextProps } from '@mui/material/DialogContentText';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface DialogContentTextProps extends Omit<MuiDialogContentTextProps, 'ref'> {
}
export declare const DialogContentText: OverridableComponent<DialogContentTextTypeMap<DialogContentTextProps, "span">> & {
    displayName: string;
};
export default DialogContentText;
