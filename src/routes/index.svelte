<script lang="ts">
    import { initializeWaves } from "../utils/funcs";
    import { onMount } from "svelte";
    import { TPS, WAVE_CONTAINER_ID } from "../consts";
    import Wave from "../components/Wave.svelte";
    import { applyGravity } from "../utils/physJ";

    onMount(() => {
        initializeWaves();

        setInterval(() => {
            applyGravity();
        }, TPS)
    })

    let density = 99;
</script>

<nav class="[ primary-nav ]">
    <h1>WavlyJS</h1>
</nav>

<div class="object" title='lol' data-gravity data-mass={10}></div>

<div id={ WAVE_CONTAINER_ID } class="[ wave-container ]">
    {#each {length: density} as _, i}
        <Wave />
    {/each}
</div>