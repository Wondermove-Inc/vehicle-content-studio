import { HTMLAttributes } from 'react';
export interface hdsBottomSheetContentProps {
}
export interface BottomSheetContentProps extends HTMLAttributes<HTMLDivElement> {
    hdsProps?: hdsBottomSheetContentProps | boolean;
}
export declare const BottomSheetContent: import("react").ForwardRefExoticComponent<BottomSheetContentProps & import("react").RefAttributes<HTMLDivElement>>;
export default BottomSheetContent;
