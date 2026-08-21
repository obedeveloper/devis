import { createContext } from 'svelte';

export interface ConfirmOptions {
	title: string;
	description?: string;
	confirmLabel?: string;
	cancelLabel?: string;
	destructive?: boolean;
}

/**
 * Confirm-dialog state, provided by the root layout via context.
 * The <dialog> element is bound onto `el`, so show/close calls happen
 * synchronously here instead of through an effect.
 */
export class ConfirmDialogState {
	open = $state(false);
	title = $state('');
	description = $state('');
	confirmLabel = $state('Confirm');
	cancelLabel = $state('Cancel');
	destructive = $state(true);

	el = $state<HTMLDialogElement>();
	cancelButton = $state<HTMLButtonElement>();

	#resolve: ((value: boolean) => void) | undefined;

	confirm(options: ConfirmOptions): Promise<boolean> {
		this.title = options.title;
		this.description = options.description ?? '';
		this.confirmLabel = options.confirmLabel ?? 'Confirm';
		this.cancelLabel = options.cancelLabel ?? 'Cancel';
		this.destructive = options.destructive ?? true;

		if (!this.el) return Promise.resolve(false);

		this.el.showModal();
		this.cancelButton?.focus();
		this.open = true;

		return new Promise((resolve) => {
			this.#resolve?.(false);
			this.#resolve = resolve;
		});
	}

	accept() {
		this.#settle(true);
	}

	cancel() {
		this.#settle(false);
	}

	syncClosed() {
		this.open = false;
	}

	#settle(value: boolean) {
		this.#resolve?.(value);
		this.#resolve = undefined;
		this.open = false;
		this.el?.close();
	}
}

export const [getConfirmDialog, setConfirmDialog] = createContext<ConfirmDialogState>();

/** Call once in the root layout before any consumer initializes. */
export function provideConfirmDialog(): ConfirmDialogState {
	return setConfirmDialog(new ConfirmDialogState());
}
