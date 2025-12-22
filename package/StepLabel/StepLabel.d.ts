/// <reference types="react" />
import { StepLabelProps as MuiStepLabelProps } from '@mui/material/StepLabel';
export interface hdsStepLabelProps {
    size?: 'small' | 'medium' | 'large';
}
export interface StepLabelProps extends Omit<MuiStepLabelProps, 'ref'> {
    hdsProps?: hdsStepLabelProps | boolean;
}
export declare const StepLabel: import("react").ForwardRefExoticComponent<StepLabelProps & import("react").RefAttributes<HTMLElement>>;
export default StepLabel;
