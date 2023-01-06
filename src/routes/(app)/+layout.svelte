<script>
    import '@picocss/pico/css/pico.min.css';
</script>

<main class="container">
    <slot></slot>
</main>

<style>
    :global(body > main) {
        --block-spacing-vertical: 10px !important;

        --primary: #57B38C;
        --primary-hover: #429270;

        --secondary: #3D7A7C;
        --secondary-hover: #316263;
    }

    :global(.logo) {
        width: 500px;
    }

    :global(h2) {
        --typography-spacing-vertical: 5px;
        --font-weight: normal;
        --font-size: 32px;
    }

    :global(section) {
        margin-top: var(--block-spacing-vertical);
        margin-bottom: 0;
        padding-top: 30px;
        border-top: 1px solid grey;
    }

    :global(.no-margin-top) {
        margin-top: 0;
    }

    @media only screen and (max-width: 480px) {
        :global(.logo) {
            width: 125px;
        }        
    }
</style>
