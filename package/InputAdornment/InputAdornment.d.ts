import { InputAdornmentTypeMap, InputAdornmentProps as MuiInputAdornmentProps } from '@mui/material/InputAdornment';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface InputAdornmentProps extends Omit<MuiInputAdornmentProps, 'ref'> {
}
export declare const InputAdornment: OverridableComponent<InputAdornmentTypeMap<MuiInputAdornmentProps, "div">> & {
    displayName: string;
};
export default InputAdornment;
