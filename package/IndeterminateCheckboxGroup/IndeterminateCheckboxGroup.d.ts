import { BoxProps } from '../Box';
import { CheckboxProps, hdsCheckboxProps } from '../Checkbox';
interface CheckboxItem<Value> {
    label: hdsCheckboxProps['label'];
    value: Value;
}
type ParentProps = Omit<CheckboxProps, 'hdsProps' | 'value'> & {
    label: hdsCheckboxProps['label'];
};
type ChildrenProps<Value> = Omit<CheckboxProps, 'hdsProps' | 'value'> & {
    childCheckboxItems: CheckboxItem<Value>[];
    muiBoxProps?: BoxProps;
};
export interface IndeterminateCheckboxGroupProps<Value> {
    hdsProps?: Partial<Pick<hdsCheckboxProps, 'size' | 'isInvalid'>>;
    childrenProps: ChildrenProps<Value>;
    parentProps: ParentProps;
    values?: Value[];
    onChange?: (childStates: Value[]) => void;
}
export declare const IndeterminateCheckboxGroup: {
    <Value extends string | number>({ hdsProps, parentProps, childrenProps, values, onChange, }: IndeterminateCheckboxGroupProps<Value>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export default IndeterminateCheckboxGroup;
