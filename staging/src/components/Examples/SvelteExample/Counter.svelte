<script>
  export let count = 0;
  const incr = () => (count = count + 1);
  const dec = () => (count = count - 1);
</script>

<div>Count: {count}</div>
<button on:click={incr}>+1</button>
<button on:click={dec}>-1</button>
