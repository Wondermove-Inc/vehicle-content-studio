import { TablePaginationOwnProps } from '@mui/material';
import React, { CSSProperties, HTMLAttributes } from 'react';
export interface hdsTableDataCustomProps {
    size?: 'small' | 'medium' | 'large';
    isCheckbox?: boolean;
    tableStyle?: CSSProperties;
    emptyItem?: React.ReactNode;
}
export interface TableDataCustomProps extends HTMLAttributes<HTMLDivElement> {
    hdsProps?: hdsTableDataCustomProps | boolean;
    rows: any[];
    columns: any[];
    search?: string;
    rowsPerPageOptions?: TablePaginationOwnProps['rowsPerPageOptions'];
    onClickRow?: (rowId: number) => void;
    onSelectionChanged?: (selected: number[]) => void;
    initialOrder?: 'asc' | 'desc' | '';
    initialOrderBy?: string;
    initialSelected?: number[];
    initialPage?: number;
    initialRowsPerPage?: number;
}
export declare const TableDataCustom: import("@emotion/styled").StyledComponent<TableDataCustomProps & React.RefAttributes<HTMLDivElement> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export default TableDataCustom;
