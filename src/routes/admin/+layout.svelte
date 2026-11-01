<script lang="ts">
	import './layout.css';
	import AdminHeader from '$lib/components/AdminHeader.svelte';
	let { children } = $props();
</script>
<AdminHeader />
<main>
{@render children()}
</main>

