/// <reference types="react" />
import { CardActionsProps as MuiCardActionsProps } from '@mui/material/CardActions';
export interface hdsCardActionsProps {
    type?: 'default' | 'buttons';
}
export interface CardActionsProps extends Omit<MuiCardActionsProps, 'ref'> {
    hdsProps?: hdsCardActionsProps | boolean;
}
export declare const CardActions: import("react").ForwardRefExoticComponent<CardActionsProps & import("react").RefAttributes<HTMLElement>>;
export default CardActions;
