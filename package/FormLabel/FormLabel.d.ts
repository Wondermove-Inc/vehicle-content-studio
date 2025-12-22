import { FormLabelTypeMap, FormLabelProps as MuiFormLabelProps } from '@mui/material/FormLabel';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface FormLabelProps extends Omit<MuiFormLabelProps, 'ref'> {
}
export declare const FormLabel: OverridableComponent<FormLabelTypeMap<FormLabelProps, "label">> & {
    displayName: string;
};
export default FormLabel;
