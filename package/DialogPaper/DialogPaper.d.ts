/// <reference types="react" />
import { PaperProps as MuiPaperProps } from '@mui/material/Paper';
import { DialogProps } from '@mui/material';
export interface hdsDialogPaperProps {
    size?: 'small' | 'medium' | 'large';
    section?: boolean;
    isScrollable?: boolean;
}
export interface DialogPaperProps extends Omit<MuiPaperProps, 'ref'> {
    hdsProps?: hdsDialogPaperProps | boolean;
    scroll?: DialogProps['scroll'];
}
export declare const DialogPaper: import("react").ForwardRefExoticComponent<DialogPaperProps & import("react").RefAttributes<HTMLDivElement>>;
export default DialogPaper;
