import { HTMLAttributes } from 'react';
export interface hdsBottomSheetProps {
    isScrollable?: boolean;
}
export interface BottomSheetProps extends HTMLAttributes<HTMLDivElement> {
    hdsProps?: hdsBottomSheetProps | boolean;
}
export declare const BottomSheet: import("react").ForwardRefExoticComponent<BottomSheetProps & import("react").RefAttributes<HTMLDivElement>>;
export default BottomSheet;
