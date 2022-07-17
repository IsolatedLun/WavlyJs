<script lang="ts">
    import { rand } from "../../utils/funcs";
    import { onMount } from "svelte";

    onMount(() => {
        _this.style.transform = `translate(${Math.random() * window.screen.availWidth}px, -500%)`;

        setTimeout(() => {
            if(_this)
                _this.setAttribute('data-dead', 'false');
        }, rand(spawnDelay))
    })

    export let spawnDelay = 25;
    let _this: HTMLElement;
</script>

<span>
    <div 
    bind:this={_this} 
    class="[ object ]" 
    title='rain'
    data-object={'rain'} 
    data-handler='rain'
    data-dead='true'
    data-weight={100}
    data-gravity></div>
</span>