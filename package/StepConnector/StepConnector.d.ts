/// <reference types="react" />
import { StepConnectorProps as MuiStepConnectorProps } from '@mui/material/StepConnector';
export interface StepConnectorProps extends Omit<MuiStepConnectorProps, 'ref'> {
}
export declare const StepConnector: import("react").ForwardRefExoticComponent<StepConnectorProps & import("react").RefAttributes<HTMLElement>>;
export default StepConnector;
