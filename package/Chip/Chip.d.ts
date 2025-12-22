import { ChipTypeMap, ChipProps as MuiChipProps } from '@mui/material/Chip';
import React from 'react';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsChipProps {
    label?: React.ReactNode;
    size?: 'small' | 'medium';
    type?: 'outline' | 'fill_low' | 'fill_high' | 'enable' | 'selected' | 'disabled';
    icon?: React.ReactNode;
}
export interface ChipProps extends Omit<MuiChipProps, 'ref'> {
    hdsProps?: hdsChipProps | boolean;
}
export declare const Chip: OverridableComponent<ChipTypeMap<ChipProps, "div">> & {
    displayName: string;
};
export default Chip;
