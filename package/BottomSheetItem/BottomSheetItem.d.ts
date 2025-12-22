import { HTMLAttributes } from 'react';
export interface hdsBottomSheetItemProps {
}
export interface BottomSheetItemProps extends HTMLAttributes<HTMLParagraphElement> {
    hdsProps?: hdsBottomSheetItemProps | boolean;
}
export declare const BottomSheetItem: import("react").ForwardRefExoticComponent<BottomSheetItemProps & import("react").RefAttributes<HTMLParagraphElement>>;
export default BottomSheetItem;
