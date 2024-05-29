<script>
import Counter from "./Counter.svelte";
$: count = 0;
$: isMoreThanOne = count > 1;
</script>

<Counter bind:count />
<span>is More than 1: {isMoreThanOne} </span>
