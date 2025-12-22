import { ImageListItemTypeMap, ImageListItemProps as MuiImageListItemProps } from '@mui/material/ImageListItem';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface ImageListItemProps extends Omit<MuiImageListItemProps, 'ref'> {
}
export declare const ImageListItem: OverridableComponent<ImageListItemTypeMap<ImageListItemProps, "li">> & {
    displayName: string;
};
export default ImageListItem;
