import { AccordionProps as MuiAccordionProps, AccordionTypeMap } from '@mui/material/Accordion';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsAccordionProps {
    size?: 'small' | 'medium' | 'large';
    isDivider?: boolean;
}
export interface AccordionProps extends Omit<MuiAccordionProps, 'ref'> {
    hdsProps?: hdsAccordionProps | boolean;
}
export declare const Accordion: OverridableComponent<AccordionTypeMap<AccordionProps>> & {
    displayName: string;
};
export default Accordion;
