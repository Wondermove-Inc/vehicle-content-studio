import { AccordionActionsProps as MuiAccordionActionsProps } from '@mui/material/AccordionActions';
import React from 'react';
export interface hdsAccordionActionsProps {
}
export interface AccordionActionsProps extends Omit<MuiAccordionActionsProps, 'ref'> {
    hdsProps?: hdsAccordionActionsProps | boolean;
}
export declare const AccordionActions: React.ForwardRefExoticComponent<AccordionActionsProps & React.RefAttributes<HTMLElement>>;
export default AccordionActions;
