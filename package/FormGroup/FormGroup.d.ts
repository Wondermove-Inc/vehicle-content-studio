/// <reference types="react" />
import { FormGroupProps as MuiFormGroupProps } from '@mui/material/FormGroup';
export interface FormGroupProps extends Omit<MuiFormGroupProps, 'ref'> {
}
export declare const FormGroup: import("react").ForwardRefExoticComponent<FormGroupProps & import("react").RefAttributes<HTMLElement>>;
export default FormGroup;
