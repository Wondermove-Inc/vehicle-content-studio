import { StepProps as MuiStepProps, StepTypeMap } from '@mui/material/Step';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsStepProps {
}
export interface StepProps extends Omit<MuiStepProps, 'ref'> {
    hdsProps?: hdsStepProps | boolean;
}
export declare const Step: OverridableComponent<StepTypeMap<StepProps, "div">> & {
    displayName: string;
};
export default Step;
