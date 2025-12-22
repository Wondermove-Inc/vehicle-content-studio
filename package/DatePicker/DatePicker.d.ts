import React, { CSSProperties, ForwardedRef } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
export type { ReactDatePicker };
export interface hdsDatePickerProps {
    size?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
    helpText?: React.ReactNode;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isNative?: boolean;
    isClear?: boolean;
}
export declare enum DatePickerShowType {
    DEFAULT = "DEFAULT",
    MONTH = "MONTH",
    YEAR = "YEAR"
}
export type DatePickerProps<WithRange extends boolean | undefined = undefined, WithMultiple extends boolean | undefined = undefined> = Omit<ReactDatePickerProps<WithRange, WithMultiple>, 'ref'> & {
    hdsProps?: hdsDatePickerProps | boolean;
    style?: CSSProperties;
};
export declare const DatePicker: <WithRange extends boolean | undefined = undefined, WithMultiple extends boolean | undefined = undefined>(props: Omit<ReactDatePickerProps<WithRange, WithMultiple>, "ref"> & {
    hdsProps?: boolean | hdsDatePickerProps | undefined;
    style?: React.CSSProperties | undefined;
} & {
    ref?: React.ForwardedRef<ReactDatePicker<undefined, undefined>> | undefined;
}) => ReactReturnType;
export default DatePicker;
