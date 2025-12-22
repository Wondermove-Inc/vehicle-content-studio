import { BottomNavigationTypeMap, BottomNavigationProps as MuiBottomNavigationProps } from '@mui/material/BottomNavigation';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsBottomNavigationProps {
    isFixed?: boolean;
}
export interface BottomNavigationProps extends Omit<MuiBottomNavigationProps, 'ref'> {
    hdsProps?: hdsBottomNavigationProps | boolean;
}
export declare const BottomNavigation: OverridableComponent<BottomNavigationTypeMap<BottomNavigationProps, "div">> & {
    displayName: string;
};
export default BottomNavigation;
