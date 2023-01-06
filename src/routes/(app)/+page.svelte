<script>
    import { enhance } from '$app/forms';
    import { db } from '$lib/firebase'
    import { collection, query, onSnapshot, where } from 'firebase/firestore'
    import { onMount } from 'svelte';
    import Toast from '$lib/component/Toast.svelte';

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
    <img src="logo.png" class="logo" alt="Adorade"/>
    <section>
        <h2>Qui a été adorade ce matin ?</h2>
        <form method="POST" use:enhance class="grid">
            <button formaction="?/manAllowed">
                Un Homme
                <span class="badge">{count.man.allowed}</span>
            </button>
            <button formaction="?/womenAllowed" class="secondary">
                Une Femme
                <span class="badge secondary">{count.women.allowed}</span>
            </button>
        </form>
    </section>
    <section class="no-margin-top">
        <h2>Qui n'a <strong>pas</strong> été adorade ce matin ?</h2>
        <form method="POST" use:enhance class="grid">
            <button formaction="?/manDisallowed">
                Un Homme
                <span class="badge">{count.man.disallowed}</span>
            </button>
            <button formaction="?/womenDisallowed" class="secondary">
                Une Femme
                <span class="badge secondary">{count.women.disallowed}</span>
            </button>
        </form>
    </section>
    <section>
        <a href="/stats" class="secondary">Stats</a>
    </section>
</article>

{#if form?.success}
    {#if 'man' === form.gender}
        {#if form.allowed}
            <Toast message="Wow il a été adorade ce monsieur !"/>
        {:else}
            <Toast message="Tfacon les hommes, c'est tous les mêmes !" type="disallowed"/>
        {/if}
    {:else}
        {#if form.allowed}
            <Toast message="Wow elle a été adorade cette madame !"/>
        {:else}
            <Toast message="Toutes des putes, sauf maman !" type="disallowed"/>
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
