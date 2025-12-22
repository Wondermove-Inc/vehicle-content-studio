/// <reference types="react" />
import { RadioGroupProps as MuiRadioGroupProps } from '@mui/material/RadioGroup';
export interface RadioGroupProps extends Omit<MuiRadioGroupProps, 'ref'> {
}
export declare const RadioGroup: import("react").ForwardRefExoticComponent<RadioGroupProps & import("react").RefAttributes<HTMLElement>>;
export default RadioGroup;
