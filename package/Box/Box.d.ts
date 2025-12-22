import { Theme as MaterialTheme } from '@mui/material';
import { BoxProps as MuiBoxProps } from '@mui/material/Box';
import { BoxTypeMap } from '@mui/system';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface BoxProps extends Omit<MuiBoxProps, 'ref'> {
}
export declare const Box: OverridableComponent<BoxTypeMap<BoxProps, "div", MaterialTheme>> & {
    displayName: string;
};
export default Box;
