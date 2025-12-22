import { HTMLAttributes } from 'react';
export interface hdsBottomSheetHeadProps {
    title?: React.ReactNode;
    isCloseButton?: boolean;
}
export interface BottomSheetHeadProps extends HTMLAttributes<HTMLDivElement> {
    hdsProps?: hdsBottomSheetHeadProps | boolean;
}
export declare const BottomSheetHead: import("react").ForwardRefExoticComponent<BottomSheetHeadProps & import("react").RefAttributes<HTMLDivElement>>;
export default BottomSheetHead;
