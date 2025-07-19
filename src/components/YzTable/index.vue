<template>
	<div class="yz-table yz-card">
		<el-table
			ref="tableRef"
			scrollbar-always-on
			show-overflow-tooltip
			:max-height="tableHeight || undefined"
			v-bind="tableAttrs"
			:data="data"
			v-loading="loading"
			:stripe="stripe"
			:border="border"
			:row-key="rowKey"
			:size="size"
			@sort-change="onSortChange"
			@selection-change="onSelectionChange"
			@row-click="onRowClick"
		>
			<!-- 多选列 -->
			<el-table-column v-if="showSelection" type="selection" width="55" />
			<!-- 序号列 -->
			<el-table-column
				v-if="showIndex"
				type="index"
				:label="indexLabel"
				width="55"
			/>
			<!-- 动态列 -->
			<el-table-column
				v-for="col in columns"
				:key="col.prop || col.label"
				:prop="col.prop"
				:label="col.label"
				:width="col.width"
				:sortable="col.sortable"
				v-bind="col.columnProps"
			>
				<template v-if="col.slot" v-slot="scope">
					<slot :name="col.slot" v-bind="scope" />
				</template>
				<template v-else-if="col.formatter" v-slot="scope">
					{{
						col?.formatter?.(
							scope.row[col.prop as string],
							scope.row,
							scope.$index,
						)
					}}
				</template>
			</el-table-column>
		</el-table>

		<!-- 分页 -->
		<el-pagination
			ref="paginationRef"
			class="yz-table_pagination"
			v-if="pagination"
			background
			:current-page.sync="innerPage"
			:page-size.sync="innerSize"
			:page-sizes="pageSizes"
			:total="total"
			layout="sizes, jumper, prev, pager, next"
			@size-change="onSizeChange"
			@current-change="onCurrentChange"
			@change="onPaginationChange"
		/>
	</div>
</template>

<script setup lang="ts">
import {
	ref,
	computed,
	defineProps,
	defineEmits,
	useAttrs,
	watch,
	onMounted,
	onUnmounted,
	nextTick,
} from 'vue';
import type {
	TableProps as ElTableProps,
	ElTable,
	ElPagination,
} from 'element-plus';
import { debounce } from 'lodash';

import { eventBus, SEARCH_EVENTS } from '@/utils';

import type { IProps } from './types';

const props = defineProps<IProps>();

const attrs = useAttrs();
const tableAttrs = computed(
	() =>
		attrs as Omit<
			ElTableProps<any>,
			'data' | 'loading' | 'stripe' | 'border' | 'rowKey' | 'size'
		>,
);

const tableRef = ref<InstanceType<typeof ElTable> | null>(null);
const paginationRef = ref<InstanceType<typeof ElTable> | null>(null);

const tableHeight = ref<string | number>(0);

const innerPage = ref(props.pagination?.currentPage ?? 1);
const innerSize = ref(props.pagination?.pageSize ?? 20);

const emits = defineEmits<{
	(
		e: 'sort-change',
		sort: { column: any; prop: string; order: string },
	): void;
	(e: 'selection-change', rows: any[]): void;
	(e: 'row-click', row: any, column: any, event: Event): void;
	(e: 'current-change', page: number): void;
	(e: 'size-change', size: number): void;
	(e: 'pagination-change', page: number, size: number): void;
}>();

watch(innerPage, (val) => emits('current-change', val));
watch(innerSize, (val) => emits('size-change', val));

const pageSizes = computed(
	() => props.pagination?.pageSizes ?? [10, 20, 50, 100],
);
const total = computed(() => props.pagination?.total ?? 0);

const onSortChange = (sort: {
	column: any;
	prop: string;
	order: any;
}): void => {
	emits('sort-change', sort);
};

const onSelectionChange = (rows: any[]) => {
	emits('selection-change', rows);
};

const onRowClick = (row: any, column: any, event: Event) => {
	emits('row-click', row, column, event);
};

const onSizeChange = (value: number) => {
	emits('size-change', value);
};

const onCurrentChange = (value: number) => {
	emits('current-change', value);
};

const onPaginationChange = (currentPage: number, pageSize: number) => {
	emits('pagination-change', currentPage, pageSize);
};

const calculateTableHeight = debounce(async () => {
	await nextTick();
	const tableEl = tableRef.value?.$el as HTMLElement | undefined;
	if (!tableEl) return;
	const tableHeaderEl = tableEl?.querySelector<HTMLElement>(
		'.el-table__header-wrapper',
	);
	const paginationEl = paginationRef.value?.$el as HTMLElement | undefined;

	if (!tableHeaderEl) return;
	const tableHeaderHeight = tableHeaderEl?.offsetHeight || 0;

	const top = tableEl.getBoundingClientRect().top || 0;
	const bottomOffset = 0;

	const paginationHeight = paginationEl?.offsetHeight || 0;

	const tableOffset = tableHeaderHeight + paginationHeight;

	tableHeight.value = `calc(100vh - ${top + bottomOffset + tableOffset}px)`;
}, 300);

onMounted(() => {
	calculateTableHeight();
	eventBus.on(SEARCH_EVENTS.EXPAND_CHANGE, calculateTableHeight);
	window.addEventListener('resize', calculateTableHeight);
});

onUnmounted(() => {
	eventBus.off(SEARCH_EVENTS.EXPAND_CHANGE, calculateTableHeight);
    window.removeEventListener('resize', calculateTableHeight);
});
</script>

<style scoped lang="scss">
.yz-table {
	:deep(.el-table) {
		transition: all .3s;

		th.el-table__cell {
			background-color: #f2f2f2;
			color: #444444;
		}
	}


	&_pagination {
		margin-top: $margin-base;
		justify-content: flex-end;
	}
}
</style>
