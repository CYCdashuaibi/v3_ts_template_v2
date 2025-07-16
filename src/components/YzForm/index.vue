<template>
	<el-form
		ref="formRef"
		v-bind="formAttrs"
		:model="innerModel"
		:rules="computedRules"
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
					/>
				</el-form-item>
			</el-col>
		</el-row>

		<el-form-item>
			<slot name="actions">
				<el-button type="primary" @click="submit">
					{{ submitText }}
				</el-button>
				<el-button @click="reset">
					{{ cancelText }}
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
} from 'vue';
import type { FormInstance, FormRules, FormProps } from 'element-plus';

// 支持递归注册名称
defineOptions({ name: 'BaseForm' });

interface FieldSchema {
	prop: string;
	label: string;
	type?: string;
	span?: number;
	required?: boolean;
	rules?: FormRules[string];
	componentProps?: Record<string, any>;
	formItemProps?: Record<string, any>;
}

const props = defineProps<
	{
		modelValue: Record<string, any>;
		schema: FieldSchema[];
		rules?: FormRules;
		submitText?: string;
		cancelText?: string;
		gutter?: number;
	} & Omit<FormProps, 'model' | 'rules'>
>();

const emit = defineEmits<{
	(e: 'update:modelValue', val: Record<string, any>): void;
	(e: 'submit', val: Record<string, any>): void;
}>();

// el-form 其余属性
const formAttrs = useAttrs() as Omit<FormProps, 'model' | 'rules'>;

const gutter = props.gutter ?? 20;
const formRef = ref<FormInstance>();
const innerModel = ref({ ...props.modelValue });

// 初始化内部模型
function initModel() {
	innerModel.value = { ...props.modelValue };
}
initModel();

// 合并规则
const computedRules = computed<FormRules>(() => {
	const merged: FormRules = { ...(props.rules || {}) };
	props.schema.forEach((field) => {
		if (field.rules) {
			merged[field.prop] = field.rules;
		} else if (field.required && !merged[field.prop]) {
			merged[field.prop] = [
				{
					required: true,
					message: `请输入${field.label}`,
					trigger: 'blur',
				},
			];
		}
	});
	return merged;
});

const submitText = props.submitText ?? '提交';
const cancelText = props.cancelText ?? '重置';

// 双向绑定
watch(
	() => props.modelValue,
	() => initModel(),
	{ deep: true },
);
watch(innerModel, (v) => emit('update:modelValue', v), { deep: true });

function resolveComponent(type = 'input') {
	const map: Record<string, string> = {
		input: 'el-input',
		select: 'el-select',
		textarea: 'el-input',
		datepicker: 'el-date-picker',
		switch: 'el-switch',
	};
	return map[type] || type;
}

function submit() {
	formRef.value?.validate((valid) => {
		if (valid) emit('submit', innerModel.value);
	});
}

function reset() {
	formRef.value?.resetFields();
	initModel();
	emit('update:modelValue', innerModel.value);
}
</script>

<style scoped lang="scss">
.el-form-item {
	margin-bottom: 16px;
}
</style>
