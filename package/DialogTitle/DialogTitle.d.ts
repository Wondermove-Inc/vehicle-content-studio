/// <reference types="react" />
import { DialogTitleTypeMap, DialogTitleProps as MuiDialogTitleProps } from '@mui/material/DialogTitle';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsDialogTitleProps {
    closeIcon?: React.ReactNode | boolean;
    onClose?: () => void;
}
export interface DialogTitleProps extends Omit<MuiDialogTitleProps, 'ref'> {
    hdsProps?: hdsDialogTitleProps | boolean;
}
export declare const DialogTitle: OverridableComponent<DialogTitleTypeMap<DialogTitleProps, "span">> & {
    displayName: string;
};
export default DialogTitle;
