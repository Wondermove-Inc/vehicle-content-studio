/// <reference types="react" />
import { SnackbarProps as MuiSnackbarProps } from '@mui/material/Snackbar';
export interface hdsSnackbarProps {
    type?: 'dark' | 'dark_low' | 'light';
    isClose?: boolean;
    icon?: React.ReactNode;
    onClickAction?: () => void;
}
export interface SnackbarProps extends Omit<MuiSnackbarProps, 'ref'> {
    hdsProps?: hdsSnackbarProps | boolean;
}
export declare const Snackbar: import("react").ForwardRefExoticComponent<SnackbarProps & import("react").RefAttributes<HTMLElement>>;
export default Snackbar;
