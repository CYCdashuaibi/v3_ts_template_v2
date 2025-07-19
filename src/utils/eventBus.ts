import { ref, type Ref } from 'vue';

interface IEventBus {
	listeners: Ref<Record<string, Array<(data?: any) => void>>>;
	emit: (event: string, data?: any) => void;
	on: (event: string, callback: (data?: any) => void) => void;
	off: (event: string, callback?: (data?: any) => void) => void;
}

export const eventBus: IEventBus = {
	listeners: ref<Record<string, Array<(data?: any) => void>>>({}),

	emit(event: string, data?: any) {
		const callbacks = this.listeners.value[event];
		if (callbacks) {
			callbacks.forEach((callback: (data?: any) => void) =>
				callback(data),
			);
		}
	},

	on(event: string, callback: (data?: any) => void) {
		if (!this.listeners.value[event]) {
			this.listeners.value[event] = [];
		}
		this.listeners.value[event].push(callback);
	},

	off(event: string, callback?: (data?: any) => void) {
		if (!callback) {
			delete this.listeners.value[event];
		} else {
			const callbacks = this.listeners.value[event];
			if (callbacks) {
				const index = callbacks.indexOf(callback);
				if (index > -1) {
					callbacks.splice(index, 1);
				}
			}
		}
	},
};

export const SEARCH_EVENTS = {
	EXPAND_CHANGE: 'search:expand-change',
} as const;
