<template>
  <div>
    <button @click="increment">increment</button>
    <button @click="decrement">decrement</button>
    <p>{{ count }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: "VueExample",
  data() {
    return { count: 0 };
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
};
</script>
