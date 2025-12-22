import { HTMLAttributes } from 'react';
export interface hdsChipItemProps {
    icon?: React.ReactNode;
}
export interface ChipItemProps extends HTMLAttributes<HTMLLIElement> {
    hdsProps?: hdsChipItemProps | boolean;
}
export declare const ChipItem: import("react").ForwardRefExoticComponent<ChipItemProps & import("react").RefAttributes<HTMLLIElement>>;
export default ChipItem;
