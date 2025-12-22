import { BackdropTypeMap, BackdropProps as MuiBackdropProps } from '@mui/material/Backdrop';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export interface hdsBackdropProps {
    style?: 'low' | 'high' | 'white_low' | 'white_high';
}
export interface BackdropProps extends Omit<MuiBackdropProps, 'ref'> {
    hdsProps?: hdsBackdropProps | boolean;
}
export declare const Backdrop: OverridableComponent<BackdropTypeMap<BackdropProps, "div">> & {
    displayName: string;
};
export default Backdrop;
