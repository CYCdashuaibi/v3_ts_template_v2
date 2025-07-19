import type { TableProps } from 'element-plus';

export interface IColumnConfig {
	prop?: string;
	label: string;
	width?: string | number;
	sortable?: boolean | 'custom';
	slot?: string;
	formatter?: (value: any, row: any, index: number) => string;
	columnProps?: Record<string, any>;
}

export interface IPaginationConfig {
	pageSizes?: number[];
	pageSize: number;
	currentPage: number;
	total: number;
}


export interface IProps {
	data: any[];
	columns: IColumnConfig[];
	loading?: boolean;
	rowKey?: string;
	stripe?: boolean;
	border?: boolean;
	size?: TableProps<any>['size'];
	showSelection?: boolean;
	showIndex?: boolean;
	indexLabel?: string;
	actionLabel?: string;
	pagination?: IPaginationConfig;
}
