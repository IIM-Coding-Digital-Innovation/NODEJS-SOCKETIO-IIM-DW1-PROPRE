<script setup>

const route = useRoute();

const { data: projects } = await useAsyncData(
  'projects',
  () => $fetch(`/api/projects/${route.params.id}`),
);

const { columns } = projects.value;

</script>

<template>
  <div class="flex">
    <AppColumn v-for="(column, key) in columns" :key="key" :data="column" />
  </div>
</template>
<script setup>
</script>
