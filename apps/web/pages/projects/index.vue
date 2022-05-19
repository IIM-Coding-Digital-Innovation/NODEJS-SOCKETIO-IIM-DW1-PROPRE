<script setup>

const { data: projects } = await useAsyncData('projects', () => $fetch('http://localhost:3001/projects'));

// const projects = ref([
//   { id: 1, name: 'First title', users: [{ name: 'Colin' }, { name: 'Florent' }] },
//   { id: 2, name: 'Second title', users: [{ name: 'Colin' }] },
//   { id: 3, name: 'Third title', users: [{ name: 'Florent' }] },
// ]);

</script>

<template>
  <div class="flex">
    <NuxtLink
      v-for="(project, index) in projects"
      :key="index"
      :to="`/projects/${project.id}`"
    >
      <div class="card w-96 bg-secondary-content shadow-xl">
        <div class="card-body">
          <h2 class="card-title">
            {{ project.name }}
          </h2>
          <p>{{ project.users.map(user => user.name).join(', ') }}</p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
<script setup>
</script>
