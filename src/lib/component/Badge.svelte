<script>
	import Loader from "./Loader.svelte";

    export let data;
    export let secondary = false;
    export let loading = true;
</script>

{#if loading}
    <Loader />
{:else}
    <span class="badge" class:secondary>{data}</span>
{/if}

<style>
    .badge {
        background: white;
        border-radius: 50%;
        padding: 5px 10px;
        color: var(--primary);
        float: right;
    }

    .badge.secondary {
        color: var(--secondary);
    }
</style>
