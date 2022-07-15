<script lang="ts">
    import { initializeWaves } from "../utils/funcs";
    import { onMount } from "svelte";
    import { WAVE_CONTAINER_ID } from "../consts";
    import Wave from "../components/Wave.svelte";

    onMount(() => {
        initializeWaves();
    })

    let density = 99;
</script>

<nav class="[ primary-nav ]">
    <h1>WavlyJS</h1>
</nav>

<div class="[ object ]"></div>

<div id={ WAVE_CONTAINER_ID } class="[ wave-container ]">
    {#each {length: density} as _, i}
        <Wave />
    {/each}
</div>