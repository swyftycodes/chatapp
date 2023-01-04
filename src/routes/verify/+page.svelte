<script>
	import { applyAction, enhance } from '$app/forms';
    import toast from 'svelte-french-toast';

	export let data;
	export let form;

	const submit = ({ data, form, cancel}) => {
		const { code } = Object.fromEntries(data);

		if (code.length < 6 || code.length > 6) {
			toast.error('please enter a six digit code')
			cancel()
		}

		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success(result.data.message)
					break;
				case 'failure':
					toast.error(result.data.message)
					break;
				case 'redirect':
					await applyAction(result)
					break;
			}
		}
	}
</script>

<form action="?/verify" method="post" class="flex flex-col items-center space-y-2" use:enhance={submit}>
	<h1 class="text-3xl font-bold m-10">Input verification code</h1>
	<input inputmode="numeric" maxlength="6" type="number" name="code" class="input input-bordered bg-base-200">
	<button class="btn btn-primary bg-green-400" type="submit">Confirm</button>
</form>
