<script>
    import { enhance } from '$app/forms';
    import { db } from '$lib/firebase'
    import { collection, query, onSnapshot, where } from 'firebase/firestore'
    import { onMount } from 'svelte';
    import Toast from '$lib/component/Toast.svelte';
	import Badge from '../../lib/component/Badge.svelte';

    export let form;

    let manAllowedCount, manDisallowedCount,
        womenAllowedCount, womenDisallowedCount;

    onMount(async () => {
        onSnapshot(collection(db, 'adorade', 'man', 'data'), (querySnapshot) => {
            manAllowedCount = querySnapshot.docs.filter(d => d.data().allowed === true).length;
            manDisallowedCount = querySnapshot.docs.filter(d => d.data().allowed === false).length;
        });

        onSnapshot(collection(db, 'adorade', 'women', 'data'), (querySnapshot) => {
            womenAllowedCount = querySnapshot.docs.filter(d => d.data().allowed === true).length;
            womenDisallowedCount = querySnapshot.docs.filter(d => d.data().allowed === false).length;
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
                <Badge data={manAllowedCount}/>
            </button>
            <button formaction="?/womenAllowed" class="secondary">
                Une Femme
                <Badge data={womenAllowedCount} secondary={true}/>
            </button>
        </form>
    </section>
    <section class="no-margin-top">
        <h2>Qui n'a <strong>pas</strong> été adorade ce matin ?</h2>
        <form method="POST" use:enhance class="grid">
            <button formaction="?/manDisallowed">
                Un Homme
                <Badge data={manDisallowedCount}/>
            </button>
            <button formaction="?/womenDisallowed" class="secondary">
                Une Femme
                <Badge data={womenDisallowedCount} secondary={true}/>
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

