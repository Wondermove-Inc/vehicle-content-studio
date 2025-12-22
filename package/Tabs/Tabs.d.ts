import { TabsProps as MuiTabsProps, TabsTypeMap } from '@mui/material/Tabs';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsTabsProps {
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
    type?: 'line' | 'button';
    isFullWidth?: boolean;
}
export interface TabsProps extends Omit<MuiTabsProps, 'ref'> {
    hdsProps?: hdsTabsProps | boolean;
}
export declare const Tabs: OverridableComponent<TabsTypeMap<TabsProps, "div">> & {
    displayName: string;
};
export default Tabs;
