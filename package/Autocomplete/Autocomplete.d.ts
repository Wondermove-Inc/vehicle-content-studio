import { AutocompleteRenderInputParams, AutocompleteProps as MuiAutocompleteProps } from '@mui/material/Autocomplete';
import { ChipTypeMap } from '@mui/material';
import { ForwardedRef } from 'react';
export interface hdsAutocompleteProps {
    size?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
    isFocused?: boolean;
    isInvalid?: boolean;
    helperText?: string;
    isRequired?: boolean;
    isUnderline?: boolean;
    isClear?: boolean;
    placeholder?: string;
}
export interface AutocompleteProps<Value, Multiple extends boolean | undefined = false, DisableClearable extends boolean | undefined = false, FreeSolo extends boolean | undefined = false, ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']> extends Omit<MuiAutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>, 'ref' | 'renderInput'> {
    hdsProps?: hdsAutocompleteProps | boolean;
    renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
}
export declare const Autocomplete: <Value, Multiple extends boolean | undefined = false, DisableClearable extends boolean | undefined = false, FreeSolo extends boolean | undefined = false, ChipComponent extends import("react").ElementType<any, keyof import("react").JSX.IntrinsicElements> = "div">(props: AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent> & {
    ref?: ForwardedRef<unknown> | undefined;
}) => ReactReturnType;
export default Autocomplete;
