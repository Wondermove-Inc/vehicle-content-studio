import { OverridableComponent as MuiOverridableComponent, DefaultComponentProps as MuiDefaultComponentProps, OverridableTypeMap as MuiOverridableTypeMap } from '@mui/material/OverridableComponent';
export interface OverridableComponent<TypeMap extends OverridableTypeMap> extends MuiOverridableComponent<TypeMap> {
}
export type DefaultComponentProps<TypeMap extends OverridableTypeMap> = MuiDefaultComponentProps<TypeMap> & {};
export interface OverridableTypeMap extends MuiOverridableTypeMap {
}
