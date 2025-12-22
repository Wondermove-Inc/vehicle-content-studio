/// <reference types="react" />
import { TableCellProps as MuiTableCellProps } from '@mui/material/TableCell';
export interface hdsTableCellProps {
    align?: 'left' | 'center' | 'right';
}
export interface TableCellProps extends Omit<MuiTableCellProps, 'ref'> {
    hdsProps?: hdsTableCellProps | boolean;
}
export declare const TableCell: import("@emotion/styled").StyledComponent<TableCellProps & import("react").RefAttributes<HTMLElement> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export default TableCell;
