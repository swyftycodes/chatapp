<script>
	import { applyAction, enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
	import toast from 'svelte-french-toast';
	
	export let data;
	export let form;

	const submit = ({ form, data, cancel}) => {
		const  { username, email, password } = Object.fromEntries(data);

		if (username.length < 1 || email.length < 1 || password.length < 1) {
			toast.error('All fields must be filled');
			cancel();
		}
		
		return async ({ result, update}) => {
			switch (result.type) {
				case 'success':
					toast.success(result.data.message);
					break;
				case 'failure':
					toast.error(result.data.message);
					break;
				case 'redirect':
					await applyAction(result);
					break;
			}
		}
	}
</script>

<form method="post" action="?/register" class="flex flex-col items-center space-y-2 m-10" use:enhance={submit}>
	<h1 class="text-3xl font-bold m-10">Register for an account</h1>

	<div class="form-control w-full max-w-md">
		<label class="label font-medium pb-1" for="username">Username</label>
		<input class="input input-bordered w-full bg-base-200 max-w-md" type="text" name="username">
	</div>

	<div class="form-control w-full max-w-md">
		<label class="label font-medium pb-1" for="email">Email</label>
		<input class="input input-bordered w-full bg-base-200 max-w-md" type="email" name="email">
	</div>

	<div class="form-control w-full max-w-md">
		<label class="label font-medium pb-1" for="password">Password</label>
		<input class="input input-bordered w-full bg-base-200 max-w-md" type="password" name="password">
	</div>
	
	<input type="submit" name="submit" class="btn btn-primary"> 
</form>
