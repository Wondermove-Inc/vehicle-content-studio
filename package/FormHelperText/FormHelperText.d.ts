import { FormHelperTextTypeMap, FormHelperTextProps as MuiFormHelperTextProps } from '@mui/material/FormHelperText';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface FormHelperTextProps extends Omit<MuiFormHelperTextProps, 'ref'> {
}
export declare const FormHelperText: OverridableComponent<FormHelperTextTypeMap<FormHelperTextProps, "p">> & {
    displayName: string;
};
export default FormHelperText;
