/// <reference types="react" />
import { CollapseProps as MuiCollapseProps } from '@mui/material/Collapse';
export interface CollapseProps extends Omit<MuiCollapseProps, 'ref'> {
}
export declare const Collapse: import("react").ForwardRefExoticComponent<CollapseProps & import("react").RefAttributes<HTMLElement>>;
export default Collapse;
