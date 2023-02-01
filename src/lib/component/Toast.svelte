<script>
	import { onMount } from "svelte";

    export let message;
    export let allowed;

    export let timeout = 5;
    export let display = true;

    onMount(() => {
        setTimeout(() => display = false, timeout * 1000);
    })
</script>

{#if display}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="toast" class:allowed class:disallowed={!allowed} on:click={() => {display = false}}>
    <h5>{message}</h5>
</div>
{/if}

<style>
    h5 {
        --color: #fff;
        --font-weight: normal;
        margin: 0;
    }

    .toast {
        color: var(--color);
        cursor: pointer;
        padding: 20px;
        border-radius: 10px;
        position: fixed;
        top: 50px;
        right: 50px;
    }

    .toast.allowed {
        background-color: #3c965b;
        box-shadow: 5px 5px 7px #29673e;
    }
    .toast.disallowed {
        background-color: #ad3838;
        box-shadow: 5px 5px 10px #813030;
    }

    @media only screen and (max-width: 480px) {
        .toast {
            top: 20px;
            right: 20px;
            left: 20px;
        }     
    }
</style>
