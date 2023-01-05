<script>
	import "../app.postcss"
	import toast, { Toaster } from 'svelte-french-toast';
	import { page } from '$app/stores';

	let width;
</script>

<svelte:window bind:innerWidth={width} />

<nav class="navbar bg-base-300">
	<div class="navbar-start">
		<a href="/" class="btn btn-ghost normal-case text-xl">Chat App</a>
	</div>
	
	{#if !$page.data.user}
	<div class="navbar-end">
		{#if width > 500} <a href="/about" class="btn btn-ghost normal-case text-xl">About</a>
		<a href="/login" class="btn btn-ghost normal-case text-xl">Sign In</a>
		<a href="/register" class="btn btn-primary normal-case text-xl">Register</a>
		
		{:else}
		<div class="dropdown dropdown-end">
			<label tabindex="0" class="btn m-1 btn-primary">Menu</label>
 			<ul tabindex="0" class="space-y-2 mt-4 dropdown-content menu p-2 shadow bg-base-300 rounded-box">
    			<li class="bg-base-100 "><a href="/about">About</a></li>
    			<li class="bg-base-100 "><a href="/login">Login</a></li>
    			<li class="bg-base-100 "><a href="/register">Register</a></li>
  			</ul>
		</div>
		{/if}
	</div>
	{/if}

	{#if $page.data.user}
	<div class="navbar-end">
	<div class="dropdown dropdown-end">
		<label tabindex="0" class="btn m-1 btn-primary">{$page.data.user.username}</label>
 			<ul tabindex="0" class="space-y-2 mt-4 dropdown-content menu p-2 shadow bg-base-300 rounded-box">
				<li class="bg-base-100 "><a href="/about">About</a></li>
				<li><form class="bg-base-100" action="/logout" method="post">
					<button type="submit" class="bg-base-100">Logout</button>
				</form></li>
  			</ul>
	</div>
	</div>
	{/if}
</nav>

<slot />

<Toaster />
