/// <reference types="react" />
import { StepContentProps as MuiStepContentProps } from '@mui/material/StepContent';
export interface StepContentProps extends Omit<MuiStepContentProps, 'ref'> {
}
export declare const StepContent: import("react").ForwardRefExoticComponent<StepContentProps & import("react").RefAttributes<HTMLElement>>;
export default StepContent;
