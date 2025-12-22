import { StepperProps as MuiStepperProps, StepperTypeMap } from '@mui/material/Stepper';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsStepperProps {
    size?: 'small' | 'medium' | 'large';
    orientation?: 'horizontal' | 'vertical';
}
export interface StepperProps extends Omit<MuiStepperProps, 'ref'> {
    hdsProps?: hdsStepperProps | boolean;
}
export declare const Stepper: OverridableComponent<StepperTypeMap<StepperProps, "div">> & {
    displayName: string;
};
export default Stepper;
