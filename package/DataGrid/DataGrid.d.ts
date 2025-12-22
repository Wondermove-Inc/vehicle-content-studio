import { DataGridProps as MuiDataGridProps } from '@mui/x-data-grid';
export interface DataGridProps extends Omit<MuiDataGridProps, 'ref'> {
}
export declare const DataGrid: {
    (props: DataGridProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export default DataGrid;
