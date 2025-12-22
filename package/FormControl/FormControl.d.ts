import { FormControlTypeMap, FormControlProps as MuiFormControlProps } from '@mui/material/FormControl';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface FormControlProps extends Omit<MuiFormControlProps, 'ref'> {
}
export declare const FormControl: OverridableComponent<FormControlTypeMap<FormControlProps, "div">> & {
    displayName: string;
};
export default FormControl;
