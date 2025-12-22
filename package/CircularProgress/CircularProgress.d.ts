/// <reference types="react" />
import { CircularProgressProps as MuiCircularProgressProps } from '@mui/material/CircularProgress';
export interface hdsCircularProgressProps {
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
    style?: 'default' | 'primary' | 'secondary';
}
export interface CircularProgressProps extends Omit<MuiCircularProgressProps, 'ref'> {
    hdsProps?: hdsCircularProgressProps | boolean;
}
export declare const CircularProgress: import("react").ForwardRefExoticComponent<CircularProgressProps & import("react").RefAttributes<HTMLElement>>;
export default CircularProgress;
