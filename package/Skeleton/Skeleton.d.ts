import { SkeletonProps as MuiSkeletonProps, SkeletonTypeMap } from '@mui/material/Skeleton';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsSkeletonProps {
    type?: 'circular' | 'text' | 'rectangular';
}
export interface SkeletonProps extends Omit<MuiSkeletonProps, 'ref'> {
    hdsProps?: hdsSkeletonProps | boolean;
}
export declare const Skeleton: OverridableComponent<SkeletonTypeMap<SkeletonProps, "span">> & {
    displayName: string;
};
export default Skeleton;
