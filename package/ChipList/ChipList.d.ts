import { HTMLAttributes } from 'react';
export interface hdsChipListProps {
}
export interface ChipListProps extends HTMLAttributes<HTMLUListElement> {
    hdsProps?: hdsChipListProps | boolean;
}
export declare const ChipList: import("react").ForwardRefExoticComponent<ChipListProps & import("react").RefAttributes<HTMLUListElement>>;
export default ChipList;
