<script>
	import { onMount } from "svelte";


    export let message;
    export let timeout = 5;
    export let type = 'allowed';

    let display = true;
    onMount(() => {
        setTimeout(() => display = false, timeout * 1000);
    })
</script>

{#if display}
<div class="toast {type}" on:click={() => {display = false}}>
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
        padding: 20px;
        border-radius: 20px;
        position: fixed;
        top: 50px;
        right: 50px;
    }

    .toast.allowed {
        background-color: #3c965b;
    }
    .toast.disallowed {
        background-color: #ad3838;
    }


    @media only screen and (max-width: 480px) {
        .toast {
            top: 20px;
            right: 20px;
            left: 20px;
        }     
    }
</style>
