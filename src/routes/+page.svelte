<script>
	import { enhance } from '$app/forms';
    import { db } from '$lib/firebase'
    import { collection, query, onSnapshot, where } from 'firebase/firestore'
	import { onMount } from 'svelte';

    export let form;

    let manRef, womenRef;
    let count = {
        man: {
            allowed: 0,
            disallowed: 0,
        }, 
        women: {
            allowed: 0,
            disallowed: 0,
        }
    };

    onMount(async () => {
        manRef = collection(db, 'adorade', 'man', 'data');
        womenRef = collection(db, 'adorade', 'women', 'data');

        onSnapshot(query(manRef, where('allowed', '==', true)), (querySnapshot) => {
            count.man.allowed = querySnapshot.docs.length;
        });

        onSnapshot(query(womenRef, where('allowed', '==', true)), (querySnapshot) => {
            count.women.allowed = querySnapshot.docs.length;
        });

        onSnapshot(query(manRef, where('allowed', '==', false)), (querySnapshot) => {
            count.man.disallowed = querySnapshot.docs.length;
        });

        onSnapshot(query(womenRef, where('allowed', '==', false)), (querySnapshot) => {
            count.women.disallowed = querySnapshot.docs.length;
        });
    });
</script>

<h1>Qui a été adorade ce matin ?</h1>
<form method="POST" use:enhance>
    <button formaction="?/manAllowed">Un Homme {count.man.allowed}</button>
    <button formaction="?/womenAllowed">Une Femme {count.women.allowed}</button>
</form>

<h2>Qui n'a PAS été adorade ce matin ?</h2>
<form method="POST" use:enhance>
    <button formaction="?/manDisallowed">Un Homme {count.man.disallowed}</button>
    <button formaction="?/womenDisallowed">Une Femme {count.women.disallowed}</button>
</form>

{#if form?.success}
    {#if 'man' === form.gender}
        {#if form.allowed}
            <p>Wow il a été adorade ce monsieur !</p>
        {:else}
            <p>Tfacon les hommes, c'est tous les mêmes !</p>
        {/if}
    {:else}
        {#if form.allowed}
            <p>Wow elle a été adorade cette madame !</p>
        {:else}
            <p>Toutes des putes, sauf maman !</p>
        {/if}
    {/if}
{/if}
