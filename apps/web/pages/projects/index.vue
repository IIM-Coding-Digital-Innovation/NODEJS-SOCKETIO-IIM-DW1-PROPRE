<script setup>

const { data: projects } = await useAsyncData('projects', () => $fetch('http://localhost:3001/projects'));

const createProject = async () => {
  await useFetch('http://localhost:3001/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { name: 'First project' },
  });
};
// const projects = ref([
//   { id: 1, name: 'First title', users: [{ name: 'Colin' }, { name: 'Florent' }] },
//   { id: 2, name: 'Second title', users: [{ name: 'Colin' }] },
//   { id: 3, name: 'Third title', users: [{ name: 'Florent' }] },
// ]);

</script>

<template>
  <div class="block">
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden" />
        </div>
        <a class="btn btn-ghost normal-case text-xl">Live kanban</a>
      </div>
      <div class="navbar-end">
        <a class="btn" @click.prevent="createProject">Create project</a>
      </div>
    </div>
    <div class="flex flex-col items-center gap-5 mt-10">
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
  </div>
</template>
<script setup>
</script>
