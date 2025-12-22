import { InputLabelTypeMap, InputLabelProps as MuiInputLabelProps } from '@mui/material/InputLabel';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface InputLabelProps extends Omit<MuiInputLabelProps, 'ref'> {
}
export declare const InputLabel: OverridableComponent<InputLabelTypeMap<InputLabelProps>> & {
    displayName: string;
};
export default InputLabel;
