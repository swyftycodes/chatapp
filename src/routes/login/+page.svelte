<script lang="ts">
	import toast from 'svelte-french-toast';
	import { enhance } from '$app/forms';
	
	export let data;
	export let form;

	const submit = ({ data, form, cancel }) => {
		const body = Object.fromEntries(data);

		if (!body.email || !body.password) {
			toast.error('all fields must be filled');
			cancel();
		}

		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					toast.success(result.data.message)
					break;
				case 'failure':
					toast.error(result.data.message)
					break;
			}
		}
	} 
</script>

<form method="post" action="?/login" class="flex flex-col items-center w-full space-y-2" use:enhance={submit}>
	<h1 class="text-3xl font-bold m-10">Log In</h1>
	<input type="email" name="email" class="input input-bordered bg-base-200">
	<input type="password" name="password" class="input input-bordered bg-base-200">
	<button type="submit" class="btn btn-primary bg-green-400">Submit</button>
</form>
