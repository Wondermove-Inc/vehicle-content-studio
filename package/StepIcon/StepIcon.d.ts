/// <reference types="react" />
import { StepIconProps as MuiStepIconProps } from '@mui/material/StepIcon';
export interface StepIconProps extends Omit<MuiStepIconProps, 'ref'> {
}
export declare const StepIcon: import("react").ForwardRefExoticComponent<StepIconProps & import("react").RefAttributes<HTMLElement>>;
export default StepIcon;
