import { HTMLAttributes } from 'react';
export interface hdsReactionListProps {
}
export interface ReactionListProps extends HTMLAttributes<HTMLUListElement> {
    hdsProps?: hdsReactionListProps | boolean;
}
export declare const ReactionList: import("react").ForwardRefExoticComponent<ReactionListProps & import("react").RefAttributes<HTMLUListElement>>;
export default ReactionList;
