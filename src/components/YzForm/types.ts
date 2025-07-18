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

export type ExtendedSelectProps = SelectProps & {
    options?: Array<{ label: string; value: any }>;
};

export interface IFieldComponentPropsMap {
	input: InputProps;
	textarea: InputProps;
	select: ExtendedSelectProps;
	datepicker: DatePickerProps;
	switch: SwitchProps;
};

export interface IFieldSchema<
	T extends IFieldComponentType = IFieldComponentType,
> {
	prop: string;
	label: string;
	type: T;
	required?: boolean;
	rules?: FormRules[string];
	componentProps?: Partial<IFieldComponentPropsMap[T]>;
	formItemProps?: Record<string, any>;
	span?: number;
}

export interface IOwnProps {
	modelValue: Record<string, any>;
	schema: IFieldSchema[];
	rules?: FormRules;
	submitText?: string;
	cancelText?: string;
	gutter?: number;
	hiddenActions?: boolean;
}

export type IFieldSchemas = Array<
  | IFieldSchema<'input'>
  | IFieldSchema<'select'>
  | IFieldSchema<'datepicker'>
  | IFieldSchema<'switch'>
>;