/// <reference types="react" />
import { LinearProgressProps as MuiLinearProgressProps } from '@mui/material/LinearProgress';
export interface hdsLinearProgressProps {
    isDetermine?: boolean;
    label?: React.ReactNode;
    style?: 'default' | 'primary' | 'secondary';
}
export interface LinearProgressProps extends Omit<MuiLinearProgressProps, 'ref'> {
    hdsProps?: hdsLinearProgressProps | boolean;
}
export declare const LinearProgress: import("react").ForwardRefExoticComponent<LinearProgressProps & import("react").RefAttributes<HTMLElement>>;
export default LinearProgress;
