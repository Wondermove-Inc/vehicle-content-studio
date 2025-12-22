import { ImageListTypeMap, ImageListProps as MuiImageListProps } from '@mui/material/ImageList';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface ImageListProps extends Omit<MuiImageListProps, 'ref'> {
}
export declare const ImageList: OverridableComponent<ImageListTypeMap<ImageListProps, "ul">> & {
    displayName: string;
};
export default ImageList;
