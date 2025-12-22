/// <reference types="react" />
import { SnackbarContentProps as MuiSnackbarContentProps } from '@mui/material/SnackbarContent';
export interface hdsSnackbarContentProps {
    type?: 'dark' | 'dark_low' | 'light';
    isClose?: boolean;
    icon?: React.ReactNode;
}
export interface SnackbarContentProps extends Omit<MuiSnackbarContentProps, 'ref'> {
    hdsProps?: hdsSnackbarContentProps | boolean;
}
export declare const SnackbarContent: import("react").ForwardRefExoticComponent<SnackbarContentProps & import("react").RefAttributes<HTMLDivElement>>;
export default SnackbarContent;
