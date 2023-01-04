<script lang="ts">
	export let data;
	export let form;
</script>

<form method="post" action="?/login" class="flex flex-col items-center w-full space-y-2 m-10">
	<h1 class="text-3xl font-bold">Log In</h1>
	<input type="email" name="email" class="input input-bordered bg-base-200">
	<input type="password" name="password" class="input input-bordered bg-base-200">
	<button type="submit" class="btn btn-primary bg-green-400">Submit</button>
</form>
