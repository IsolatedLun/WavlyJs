<script lang="ts">
    import { initializeWaves } from "../utils/funcs";
    import { onMount } from "svelte";
    import { TPS, WAVE_CONTAINER_ID } from "../consts";
    import Wave from "../components/Wave.svelte";
    import { applyGravity } from "../utils/physJ";
    import RainGenerator from "../components/RainGenerator.svelte";

    onMount(() => {
        initializeWaves();

            window.requestAnimationFrame(applyGravity)
    })

    let density = 55;
    let rainDensity = 0;
</script>

<nav class="[ primary-nav ]">
    <h1>WavlyJS</h1>
</nav>

<section class="card">
    <div class="[ card__evenly ]">
        <label for="wave-range">Wave density: { density }</label>
        <input type="range" name="" id="wave-range" bind:value={density} min="1" max="999" />
    </div>
    <div class="[ card__evenly ]">
        <label for="rain-range">Rain density: { rainDensity }</label>
        <input type="range" name="" id="rain-range" bind:value={rainDensity} min="0" max="999" />
    </div>
</section>

<div class="object" title='lol' data-gravity data-mass={10}></div>
<RainGenerator density={rainDensity} />

<div id={ WAVE_CONTAINER_ID } class="[ wave-container ]">
    {#each {length: density} as _, i}
        <Wave />
    {/each}
</div>