<script lang="ts">
    import { targetWave } from "../utils/funcs";
    import { onMount } from "svelte";   
    import { WAVE_CLASS } from "../consts";


    onMount(() => {
        self.addEventListener('mouseenter', (e) => {
            const target = e.target as HTMLElement;
            target.setAttribute('data-block', 'true');

            targetWave(target);
        })

        self.addEventListener('mouseleave', (e) => {
            const target = e.target as HTMLElement;
            target.setAttribute('data-block', 'false');

            targetWave(target);
        })
    })

    let self: HTMLElement;
</script>

<div bind:this={self} class={`[ ${WAVE_CLASS} ]`} data-block='false' data-weight='0'>
    <div class={`[ ${WAVE_CLASS}-filler ]`}></div>
</div>