/// <reference types="react" />
import { BadgeTypeMap, BadgeProps as MuiBadgeProps } from '@mui/material/Badge';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsBadgeProps {
    size?: 'xsmall' | 'small' | 'medium';
    style?: 'default' | 'low' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'yellow' | 'purple';
    type?: 'default' | 'strong' | 'outlined';
    icon?: boolean | React.ReactNode;
    isDigit?: boolean;
    isDot?: boolean;
}
export interface BadgeProps extends Omit<MuiBadgeProps, 'ref'> {
    hdsProps?: hdsBadgeProps | boolean;
}
export declare const Badge: OverridableComponent<BadgeTypeMap<"span", BadgeProps>> & {
    displayName: string;
};
export default Badge;
