<script setup>

const columns = ref([
  { title: 'First title' },
  { title: 'Second title' },
  { title: 'Third title' },
]);

</script>

<template>
  <div class="flex">
    <AppColumn v-for="(column, key) in columns" :key="key" :title="column.title" />
  </div>
</template>
<script setup>
</script>
