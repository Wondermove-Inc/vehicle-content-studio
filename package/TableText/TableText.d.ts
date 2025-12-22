import { HTMLAttributes } from 'react';
export interface hdsTableTextProps {
    size?: 'xsmall' | 'small';
    isEllipsis?: boolean;
    isWeak?: boolean;
    isSub?: boolean;
}
export interface TableTextProps extends HTMLAttributes<HTMLParagraphElement> {
    hdsProps?: hdsTableTextProps | boolean;
}
export declare const TableText: import("react").ForwardRefExoticComponent<TableTextProps & import("react").RefAttributes<HTMLParagraphElement>>;
export default TableText;
