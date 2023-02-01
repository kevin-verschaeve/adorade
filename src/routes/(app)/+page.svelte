<script>
    import { enhance } from '$app/forms';
    import { db } from '$lib/firebase'
    import { collection, query, onSnapshot, where } from 'firebase/firestore'
    import { onMount } from 'svelte';
    import Toast from '$lib/component/Toast.svelte';
	import Badge from '../../lib/component/Badge.svelte';

    export let form;

    let manAllowedCount, manDisallowedCount, manLoading,
        womenAllowedCount, womenDisallowedCount, womenLoading;

    const reset = (gender) => {
        if (['all', 'man'].includes(gender)) {
            manAllowedCount = 0;
            manDisallowedCount = 0;
            manLoading = true;
        }

        if (['all', 'women'].includes(gender)) {
            womenAllowedCount = 0;
            womenDisallowedCount = 0;
            womenLoading = true;
        }
    }

    onMount(async () => {
        reset('all');
        onSnapshot(collection(db, 'adorade', 'man', 'data'), (querySnapshot) => {
            reset('man');
            querySnapshot.docs.forEach((doc) => {
                if (doc.data().allowed) {
                    manAllowedCount++
                } else {
                    manDisallowedCount++;
                }
            });
            manLoading = false;
        });

        onSnapshot(collection(db, 'adorade', 'women', 'data'), (querySnapshot) => {
            reset('women');
            querySnapshot.docs.forEach((doc) => {
                if (doc.data().allowed) {
                    womenAllowedCount++
                } else {
                    womenDisallowedCount++;
                }
            });
            womenLoading = false;
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
                <Badge data={manAllowedCount} loading={manLoading}/>
            </button>
            <button formaction="?/womenAllowed" class="secondary">
                Une Femme
                <Badge data={womenAllowedCount} secondary={true} loading={womenLoading}/>
            </button>
        </form>
    </section>
    <section class="no-margin-top">
        <h2>Qui n'a <strong>pas</strong> été adorade ce matin ?</h2>
        <form method="POST" use:enhance class="grid">
            <button formaction="?/manDisallowed">
                Un Homme
                <Badge data={manDisallowedCount} loading={manLoading}/>
            </button>
            <button formaction="?/womenDisallowed" class="secondary">
                Une Femme
                <Badge data={womenDisallowedCount} secondary={true} loading={womenLoading}/>
            </button>
        </form>
    </section>
    <section>
        <a href="/stats" class="secondary">Stats</a>
    </section>
</article>

{#if form}
    <Toast display={form} {...form}/>
{/if}
