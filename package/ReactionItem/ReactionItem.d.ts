import { HTMLAttributes } from 'react';
export interface hdsReactionItemProps {
    icon?: React.ReactNode;
    text?: React.ReactNode;
}
export interface ReactionItemProps extends HTMLAttributes<HTMLLIElement> {
    hdsProps?: hdsReactionItemProps | boolean;
}
export declare const ReactionItem: import("react").ForwardRefExoticComponent<ReactionItemProps & import("react").RefAttributes<HTMLLIElement>>;
export default ReactionItem;
