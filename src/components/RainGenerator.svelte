<script lang='ts'>
    import { onMount } from "svelte";
    import Rain from "./Rain/Rain.svelte";

    export let density = 5; 
    export let spawnDelay: number = 25;
</script>

<h1>{ density }</h1>

{#key density}
    {#each {length: density} as _, i}
        <Rain spawnDelay={spawnDelay} />    
    {/each}
{/key}