import { HTMLAttributes } from 'react';
export interface hdsBottomSheetCheckboxItemProps {
    sheet?: React.ReactNode;
    isSelectedSheet?: boolean;
}
export interface BottomSheetCheckboxItemProps extends HTMLAttributes<HTMLLIElement> {
    hdsProps?: hdsBottomSheetCheckboxItemProps | boolean;
}
export declare const BottomSheetCheckboxItem: import("react").ForwardRefExoticComponent<BottomSheetCheckboxItemProps & import("react").RefAttributes<HTMLLIElement>>;
export default BottomSheetCheckboxItem;
