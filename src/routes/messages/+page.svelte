<script lang="ts">
	import { onMount } from 'svelte';
	import { io } from 'socket.io-client';

	let convos: object[] = []

	onMount(async () => {
		const res = await fetch('/api/convos', {
			headers: {
   			'Content-Type': 'application/json'
			}
		})

		convos = await res.json()
	})

	const socket = io('http://localhost:3000');
	
	socket.emit('message', 'hello')
</script>

<div class="flex flex-col items-center">
	<h1 class="text-3xl font-bold m-10">Your conversations</h1>

	<!-- The button to open modal -->
	<label for="my-modal" class="btn">create conversation</label>
	
	<input type="checkbox" id="my-modal" class="modal-toggle" />
	<div class="modal">
		<div class="modal-box">
			<div class="flex justify-between">
			<h2 class="font-bold text-xl mt-1">Create new conversation</h2>
	    <div class="mt-0 modal-action">
	      <label for="my-modal" class="btn">Close</label>
			</div>
			</div>

			<form>
				<label class="label" for="group_name">Conversation name</label>
				<input class="input input-bordered bg-base-200" type="text" name="group_name">
				<button class="btn btn-primary" type="submit">Create</button>
			</form>

	  </div>
	</div>
	
	<ul>
		{#each convos as convo}
			<li class="my-3">
				<h2 class="font-bold text-xl">{convo.id} | {convo.convo_name}</h2>
			</li>
		{/each}
	</ul>
</div>
