import { OverridableComponent } from '@mui/material/OverridableComponent';
import { StackProps as MuiStackProps, StackTypeMap } from '@mui/material/Stack';
export interface StackProps extends Omit<MuiStackProps, 'ref'> {
}
export declare const Stack: OverridableComponent<StackTypeMap<StackProps, "div">> & {
    displayName: string;
};
export default Stack;
