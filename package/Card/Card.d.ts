import { CardTypeMap, CardProps as MuiCardProps } from '@mui/material/Card';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsCardProps {
    type?: 'default' | 'action' | 'custom';
}
export interface CardProps extends Omit<MuiCardProps, 'ref'> {
    hdsProps?: hdsCardProps | boolean;
}
export declare const Card: OverridableComponent<CardTypeMap<CardProps, "div">> & {
    displayName: string;
};
export default Card;
