/// <reference types="react" />
import { TextareaAutosizeProps as MuiTextareaAutosizeProps } from '@mui/material/TextareaAutosize';
export interface TextareaAutosizeProps extends Omit<MuiTextareaAutosizeProps, 'ref'> {
}
export declare const TextareaAutosize: import("react").ForwardRefExoticComponent<TextareaAutosizeProps & import("react").RefAttributes<HTMLTextAreaElement>>;
export default TextareaAutosize;
