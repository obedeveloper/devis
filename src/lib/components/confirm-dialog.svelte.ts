export interface ConfirmOptions {
	title: string;
	description?: string;
	confirmLabel?: string;
	cancelLabel?: string;
	destructive?: boolean;
}

/**
 * Shared confirm-dialog state. Call `confirm()` anywhere to show the dialog
 * mounted in the root layout and await the user's answer:
 *
 *   if (await confirm({ title: 'Delete quote?' })) ...
 */
class ConfirmDialogState {
	open = $state(false);
	title = $state('');
	description = $state('');
	confirmLabel = $state('Confirm');
	cancelLabel = $state('Cancel');
	destructive = $state(true);

	#resolve: ((value: boolean) => void) | undefined;

	confirm(options: ConfirmOptions): Promise<boolean> {
		this.title = options.title;
		this.description = options.description ?? '';
		this.confirmLabel = options.confirmLabel ?? 'Confirm';
		this.cancelLabel = options.cancelLabel ?? 'Cancel';
		this.destructive = options.destructive ?? true;
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

	#settle(value: boolean) {
		this.open = false;
		this.#resolve?.(value);
		this.#resolve = undefined;
	}
}

export const confirmDialog = new ConfirmDialogState();

export function confirm(options: ConfirmOptions): Promise<boolean> {
	return confirmDialog.confirm(options);
}
