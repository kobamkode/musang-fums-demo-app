<script lang="ts">
	import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { goto, invalidateAll } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
	import { toast } from 'svelte-sonner';

	let { id }: { id: string } = $props();
	let deleting = $state(false);

	const handleUpdate = (id: string) => {
		goto(`/companies/edit/${id}`);
	};

	const handleDelete = async (id: string) => {
		if (!confirm('Are you sure you want to delete this roles?')) return;

		deleting = true;

		try {
			const formData = new FormData();
			formData.append('id', id);

			const response = await fetch('?/delete', {
				method: 'POST',
				body: formData
			});

			const result = deserialize(await response.text());

			if (result.type === 'success') {
				await invalidateAll();
			}

			applyAction(result);
		} catch (error) {
			toast.error(`failed to delete: ${error}`);
		} finally {
			deleting = false;
		}
	};
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="ghost" size="icon" class="relative size-8 p-0">
				<span class="sr-only">Open menu</span>
				<EllipsisIcon />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Actions</DropdownMenu.Label>
			<DropdownMenu.Item onclick={() => handleUpdate(id)}>Update company</DropdownMenu.Item>
			<DropdownMenu.Item onclick={() => handleDelete(id)}>Delete company</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
