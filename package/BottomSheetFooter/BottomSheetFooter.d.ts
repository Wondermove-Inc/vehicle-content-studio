import { HTMLAttributes } from 'react';
export interface hdsBottomSheetFooterProps {
}
export interface BottomSheetFooterProps extends HTMLAttributes<HTMLDivElement> {
    hdsProps?: hdsBottomSheetFooterProps | boolean;
}
export declare const BottomSheetFooter: import("react").ForwardRefExoticComponent<BottomSheetFooterProps & import("react").RefAttributes<HTMLDivElement>>;
export default BottomSheetFooter;
