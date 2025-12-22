import { OverridableComponent } from '@mui/material/OverridableComponent';
import { ToolbarProps as MuiToolbarProps, ToolbarTypeMap } from '@mui/material/Toolbar';
export interface ToolbarProps extends Omit<MuiToolbarProps, 'ref'> {
}
export declare const Toolbar: OverridableComponent<ToolbarTypeMap<ToolbarProps, "div">> & {
    displayName: string;
};
export default Toolbar;
