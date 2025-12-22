/// <reference types="react" />
import { PaginationProps as MuiPaginationProps } from '@mui/material/Pagination';
export interface hdsPaginationProps {
    size?: 'small' | 'xsmall';
    isButton?: boolean;
}
export interface PaginationProps extends Omit<MuiPaginationProps, 'ref'> {
    hdsProps?: hdsPaginationProps | boolean;
}
export declare const Pagination: import("react").ForwardRefExoticComponent<PaginationProps & import("react").RefAttributes<HTMLElement>>;
export default Pagination;
