import { BaseSelectProps, FilledSelectProps, SelectVariants, OutlinedSelectProps, StandardSelectProps, SelectChangeEvent } from '@mui/material/Select';
import { ForwardedRef } from 'react';
export interface hdsSelectProps {
    type?: 'outline' | 'underline' | 'filter';
    size?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
    isFocused?: boolean;
    isInvalid?: boolean;
    disablePortal?: boolean;
    section?: boolean;
    helperText?: string;
}
export type { BaseSelectProps, FilledSelectProps, SelectVariants, OutlinedSelectProps, StandardSelectProps, SelectChangeEvent };
export interface SelectProps<Value> extends Omit<BaseSelectProps<Value>, 'ref'> {
    hdsProps?: hdsSelectProps | boolean;
    variant?: 'outlined' | 'filled' | 'standard';
}
export declare const Select: <Value>(props: SelectProps<Value> & {
    ref?: ForwardedRef<unknown> | undefined;
}) => ReactReturnType;
export default Select;
