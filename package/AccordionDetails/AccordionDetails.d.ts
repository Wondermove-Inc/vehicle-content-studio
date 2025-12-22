import { AccordionDetailsProps as MuiAccordionDetailsProps } from '@mui/material/AccordionDetails';
import React from 'react';
export interface hdsAccordionDetailsProps {
}
export interface AccordionDetailsProps extends Omit<MuiAccordionDetailsProps, 'ref'> {
    hdsProps?: hdsAccordionDetailsProps | boolean;
}
export declare const AccordionDetails: import("@emotion/styled").StyledComponent<AccordionDetailsProps & React.RefAttributes<HTMLElement> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export default AccordionDetails;
