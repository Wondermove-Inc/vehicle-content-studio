/// <reference types="react" />
import { hdsTextFieldProps, TextFieldProps } from '../TextField';
/**
 * @see https://imask.js.org/guide.html
 */
interface IProps extends Omit<TextFieldProps, 'hdsProps' | 'onChange'> {
    hdsProps?: Omit<hdsTextFieldProps, 'isMultiline'> | boolean;
    blocks?: Object;
    definitions?: Record<string, string | RegExp>;
    lazy?: boolean;
    mask?: string | number | RegExp | Function | Date | Object;
    placeholderChar?: string;
    onChange?: (value: string | undefined) => void;
}
export declare const MaskedInput: import("react").ForwardRefExoticComponent<IProps & import("react").RefAttributes<HTMLElement>>;
export default MaskedInput;
