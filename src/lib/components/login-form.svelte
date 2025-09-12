<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	let { class: className, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();

	const id = $props.id();
</script>

<div class={cn('flex flex-col gap-6', className)} {...restProps}>
	<Card.Root class="overflow-hidden p-0">
		<Card.Content class="grid p-0 md:grid-cols-2">
			<form
				class="p-6 md:p-8"
				method="POST"
				action="?/login"
				use:enhance={() => {
					return async ({ result }) => {
						if (result.type === 'redirect') {
							goto(result.location);
						}
						if (result.type === 'failure') {
							toast.error(result.data?.error as string);
						}
					};
				}}
			>
				<div class="flex flex-col gap-6">
					<div class="flex flex-col items-center text-center">
						<h1 class="text-2xl font-bold">Welcome back</h1>
						<p class="text-balance text-muted-foreground">Login to your account</p>
					</div>
					<div class="grid gap-3">
						<Label for="email-{id}">Email</Label>
						<Input name="email" id="email-{id}" type="email" placeholder="m@example.com" required />
					</div>
					<div class="grid gap-3">
						<div class="flex items-center">
							<Label for="password">Password</Label>
						</div>
						<Input name="password" id="password-{id}" type="password" required />
					</div>
					<Button type="submit" class="w-full">Login</Button>
				</div>
			</form>
			<div class="relative hidden bg-muted md:block">
				<img
					src="/login.png"
					alt="logo"
					class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</Card.Content>
	</Card.Root>
</div>
