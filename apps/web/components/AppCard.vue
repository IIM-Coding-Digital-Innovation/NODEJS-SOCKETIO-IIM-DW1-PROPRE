<script setup>
const count = ref(0);
const increment = () => {
  console.log('test');
  count.value++;
};
</script>

<template>
  <div>
    <button class="btn" @click="increment">
      Click {{ count }}
    </button>
  </div>
</template>
