/// <reference types="react" />
import { FormControlLabelProps as MuiFormControlLabelProps } from '@mui/material/FormControlLabel';
export interface FormControlLabelProps extends Omit<MuiFormControlLabelProps, 'ref'> {
}
export declare const FormControlLabel: import("react").ForwardRefExoticComponent<FormControlLabelProps & import("react").RefAttributes<HTMLElement>>;
export default FormControlLabel;
