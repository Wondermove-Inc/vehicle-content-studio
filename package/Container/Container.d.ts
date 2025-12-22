import { ContainerTypeMap, ContainerProps as MuiContainerProps } from '@mui/material/Container';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface ContainerProps extends Omit<MuiContainerProps, 'ref'> {
}
export declare const Container: OverridableComponent<ContainerTypeMap<ContainerProps, "div">> & {
    displayName: string;
};
export default Container;
