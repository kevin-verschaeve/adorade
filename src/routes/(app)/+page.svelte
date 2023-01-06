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

<article style="text-align: center;">
    <img src="logo.png" class="logo"/>
    <section>
        <h2>Qui a été adorade ce matin ?</h2>
        <form method="POST" use:enhance class="grid">
            <div>
                <button formaction="?/manAllowed">
                    + Un Homme
                    <span class="badge">{count.women.allowed}</span>
                </button>
            </div>
            <div>
                <button formaction="?/womenAllowed" class="secondary">
                    + Une Femme
                    <span class="badge secondary">{count.women.allowed}</span>
                </button>
            </div>
        </form>
    </section>
    <section class="no-margin-top">
        <h2>Qui n'a <strong>pas</strong> été adorade ce matin ?</h2>
        <form method="POST" use:enhance class="grid">
            <div>
                <button formaction="?/manDisallowed">
                    + Un Homme
                    <span class="badge">{count.man.disallowed}</span>
                </button>
            </div>
            <div>
                <button formaction="?/womenDisallowed" class="secondary">
                    + Une Femme
                    <span class="badge secondary">{count.women.disallowed}</span>
                </button>
            </div>
        </form>
    </section>
</article>

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
