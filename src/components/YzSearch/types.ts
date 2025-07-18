import type { CSSProperties } from 'vue';
import type {
	FormRules,
	InputProps,
	SelectProps,
	DatePickerProps,
	SwitchProps,
} from 'element-plus';

export type IFieldComponentType =
	| 'input'
	| 'select'
	| 'textarea'
	| 'datepicker'
	| 'switch';

export type IExtendedSelectProps = SelectProps & {
    options?: Array<{ label: string; value: any }>;
};

export type ICommonFieldComponentProps = {
	style: CSSProperties,
}

export interface IFieldComponentPropsMap {
	input: InputProps & ICommonFieldComponentProps;
	textarea: InputProps & ICommonFieldComponentProps;
	select: IExtendedSelectProps & ICommonFieldComponentProps;
	datepicker: DatePickerProps & ICommonFieldComponentProps;
	switch: SwitchProps & ICommonFieldComponentProps;
};

export interface IFieldSchema<
	T extends IFieldComponentType = IFieldComponentType,
> {
	prop: string;
	label: string;
	type: T;
	required?: boolean;
	rules?: FormRules[string];
	componentProps?: Partial<IFieldComponentPropsMap[T]> & {
		style?: CSSProperties;
	};
	formItemProps?: Record<string, any>;
}

export interface IOwnProps {
	modelValue: Record<string, any>;
	schema: IFieldSchema[];
	rules?: FormRules;
	initHeight?: number | string;
}

export type IFieldSchemas = Array<
  | IFieldSchema<'input'>
  | IFieldSchema<'select'>
  | IFieldSchema<'datepicker'>
  | IFieldSchema<'switch'>
>;