<template>
	<el-form
		ref="formRef"
		label-width="auto"
		v-bind="formAttrs"
		:model="innerModel"
		:rules="computedRules"
		:show-message="true"
	>
		<el-row :gutter="gutter">
			<el-col
				v-for="field in schema"
				:key="field.prop"
				:span="field.span ?? 24"
			>
				<el-form-item
					:label="field.label"
					:prop="field.prop"
					v-bind="field.formItemProps"
				>
					<component
						:is="resolveComponent(field.type)"
						v-model="innerModel[field.prop]"
						v-bind="field.componentProps"
					>
						<template v-if="field.type === 'select'" v-slot:default>
							<el-option
								v-for="opt in getSelectOptions(field)"
								:key="opt.value"
								:label="opt.label"
								:value="opt.value"
							/>
						</template>
					</component>
				</el-form-item>
			</el-col>
		</el-row>

		<el-form-item v-if="!hiddenActions" class="yz-form_actions">
			<slot name="actions">
				<el-button @click="reset">
					{{ cancelText }}
				</el-button>
				<el-button type="primary" @click="submit">
					{{ submitText }}
				</el-button>
			</slot>
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts">
import {
	ref,
	watch,
	computed,
	defineProps,
	defineEmits,
	useAttrs,
	defineOptions,
	provide,
} from 'vue';
import { ElInput, ElSelect, ElDatePicker, ElSwitch } from 'element-plus';
import type { FormInstance, FormRules, FormProps } from 'element-plus';
import { isEqual } from 'lodash';

import type {
	IOwnProps,
	IFieldComponentType,
	IFieldSchema,
	ExtendedSelectProps,
} from './types';

defineOptions({ name: 'YzForm' });

type FieldComponentMap = {
	input: typeof ElInput;
	textarea: typeof ElInput;
	select: typeof ElSelect;
	datepicker: typeof ElDatePicker;
	switch: typeof ElSwitch;
};

const componentMap: FieldComponentMap = {
	input: ElInput,
	textarea: ElInput,
	select: ElSelect,
	datepicker: ElDatePicker,
	switch: ElSwitch,
};

const resolveComponent = <T extends IFieldComponentType>(
	type: T,
): FieldComponentMap[T] => componentMap[type] || ElInput;

const props = defineProps<
	IOwnProps & Partial<Omit<FormProps, 'model' | 'rules'>>
>();

const attrs = useAttrs();

const {
	modelValue,
	schema,
	rules,
	submitText = '提交',
	cancelText = '取消',
	gutter = 20,
	hiddenActions,
	...formProps
} = props;

const formAttrs = {
	...formProps,
	...attrs,
} as Partial<Omit<FormProps, 'model' | 'rules'>>;

const formRef = ref<FormInstance>();
const innerModel = ref({ ...props.modelValue });

// 初始化内部模型
const initModel = () => {
	innerModel.value = { ...props.modelValue };
};
initModel();

// 合并校验规则
const computedRules = computed<FormRules>(() => {
	const merged: FormRules = { ...(props.rules || {}) };
	(props.schema || []).forEach((field) => {
		if (field.rules) {
			merged[field.prop] = field.rules;
		} else if (field.required && !merged[field.prop]) {
			merged[field.prop] = [
				{
					required: true,
					message: `请输入${field.label}`,
					trigger: 'change',
				},
			];
		}
	});
	
	return merged;
});



const getSelectOptions = (field: IFieldSchema) => {
	return (field.componentProps as ExtendedSelectProps)?.options || [];
};

const emit = defineEmits<{
	(e: 'update:modelValue', val: Record<string, any>): void;
	(e: 'submit', val: Record<string, any>): void;
}>();

watch(
	() => props.modelValue,
	(val) => {
		if (!isEqual(val, innerModel.value)) {
			initModel();
		}
	},
	{ deep: true },
);
watch(
	innerModel,
	(val) => {
		if (!isEqual(val, props.modelValue)) {
			emit('update:modelValue', val);
		}
	},
	{ deep: true },
);

// 表单方法
const submit = () =>
	formRef.value?.validate((valid: boolean) => {
		valid && emit('submit', innerModel.value);
	});

const reset = () => {
	formRef.value?.resetFields();
	initModel();
	emit('update:modelValue', innerModel.value);
};
const validate = () =>
	new Promise((res, rej) =>
		formRef.value?.validate((valid, fields) =>
			valid ? res(innerModel.value) : rej(fields),
		),
	);

provide('formMethods', {
	submit,
	reset,
	validate,
	formRef,
	formModel: innerModel,
});
</script>

<style scoped lang="scss">
.yz-form_actions {
	:deep(.el-form-item__content) {
		justify-content: flex-end;
	}
}
</style>
