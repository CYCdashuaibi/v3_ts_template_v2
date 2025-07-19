<template>
	<div
		class="yz-search yz-card"
		:style="`height: ${isExpand ? 'auto' : formatHeigth(initHeight)}`"
	>
		<!-- 搜索表单区域 -->
		<div class="yz-search_form" ref="formContainerRef">
			<el-form
				ref="formRef"
				label-width="auto"
				v-bind="formAttrs"
				:inline="true"
				:model="innerModel"
				:rules="computedRules"
				:show-message="true"
			>
				<el-form-item
					v-for="field in schema"
					:key="field.prop"
					:label="field.label"
					:prop="field.prop"
					v-bind="field.formItemProps"
				>
					<component
						:is="resolveComponent(field.type)"
						v-model="innerModel[field.prop]"
						:style="{ width: field.type === 'select' ? '210px' : '' }"
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
			</el-form>
		</div>

		<!-- 操作按钮区域 -->
		<div class="yz-search_action">
			<el-button @click="reset" icon="refresh">重置</el-button>
			<el-button type="primary" @click="search" icon="search">
				搜索
			</el-button>
			<el-link
				type="primary"
				class="collapse-btn"
				underline="never"
				@click="changeExpand"
				v-if="isShowExpandBtn"
			>
				<span>{{ isExpand ? '收起' : '展开' }}</span>
				<el-icon :class="isExpand ? 'pack-up' : 'expand'"
					><DArrowRight
				/></el-icon>
			</el-link>
		</div>
	</div>
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
	onMounted,
	onUnmounted,
	nextTick,
} from 'vue';
import { ElInput, ElSelect, ElDatePicker, ElSwitch } from 'element-plus';
import type { FormInstance, FormRules, FormProps } from 'element-plus';
import { isEqual, debounce } from 'lodash';

import { isNumeric, eventBus, SEARCH_EVENTS } from '@/utils';

import type {
	IOwnProps,
	IFieldComponentType,
	IFieldSchema,
	IExtendedSelectProps,
} from './types';

defineOptions({ name: 'YzSearch' });

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

const { modelValue, schema, rules, initHeight = 52, ...formProps } = props;

const formAttrs = {
	...formProps,
	...attrs,
} as Partial<Omit<FormProps, 'model' | 'rules'>>;

const formRef = ref<FormInstance>();
const formContainerRef = ref();
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
	return (field.componentProps as IExtendedSelectProps)?.options || [];
};

const formatHeigth = (height: number | string) => {
	if (isNumeric(height)) {
		return `${height}px`;
	}
	return height;
};

const emit = defineEmits<{
	(e: 'update:modelValue', val: Record<string, any>): void;
	(e: 'search', val: Record<string, any>): void;
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

// 搜索
const search = () =>
	formRef.value?.validate((valid: boolean) => {
		valid && emit('search', innerModel.value);
	});
// 重置
const reset = () => {
	formRef.value?.resetFields();
	initModel();
	emit('update:modelValue', innerModel.value);
};

provide('formMethods', {
	search,
	reset,
	formRef,
	formModel: innerModel,
});

// 折叠状态
const isExpand = ref<boolean>(false);
const changeExpand = () => {
	isExpand.value = !isExpand.value;
	eventBus.emit(SEARCH_EVENTS.EXPAND_CHANGE);
};
const isShowExpandBtn = ref<boolean>(false);
const showExpandBtnHandle = debounce(() => {
	if (!formContainerRef.value) {
		return;
	}

	const rect: DOMRect = formContainerRef.value.getBoundingClientRect();
	isShowExpandBtn.value = rect.height > Number(String(initHeight).replace('px', '')) - 10;
}, 300);

onMounted(() => {
	nextTick(() => {
		showExpandBtnHandle();

		window.addEventListener('resize', showExpandBtnHandle);
	});
});

onUnmounted(() => {
	window.removeEventListener('resize', showExpandBtnHandle);
});
</script>

<style scoped lang="scss">
.yz-search {
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	gap: 12px;
	overflow: hidden;
	width: 100%;
	padding-bottom: 0;

	&.expanded {
		overflow: auto;
	}

	&_form {
		display: flex;
		flex-wrap: wrap;

		.el-form-item {
			margin-bottom: $margin-base;
		}
	}

	&_action {
		display: flex;
		align-items: center;

		.collapse-btn {
			white-space: nowrap;
			margin-left: $margin-base;

			.el-icon {
				transition: all 0.3s;
			}
			.el-icon {
				margin-left: $icon-margin;

				&.expand {
					transform: rotate(90deg);
				}

				&.pack-up {
					transform: rotate(-90deg);
				}
			}
		}
	}
}
</style>
