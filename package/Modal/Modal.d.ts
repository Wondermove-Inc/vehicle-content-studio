/// <reference types="react" />
import { ModalProps as MuiModalProps } from '@mui/material/Modal';
export interface ModalProps extends Omit<MuiModalProps, 'ref'> {
}
export declare const Modal: import("react").ForwardRefExoticComponent<ModalProps & import("react").RefAttributes<HTMLDivElement>>;
export default Modal;
