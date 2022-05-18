<script setup>
import Draggable from 'vuedraggable';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const tasks = ref([
  { title: 'task1', content: 'this is a task' },
  { title: 'task2', content: 'this is a task' },
]);

</script>

<template>
  <div class="flex">
    <div class="card bg-secondary-content mx-5 min-h-screen w-72">
      <h2 class="m-2">
        {{ props.title }}
      </h2>
      <Draggable
        v-model="tasks"
        class="w-full h-full flex flex-col gap-5 p-5"
        item-key="title"
        group="tasks"
      >
        <template #item="{element}">
          <AppTask :title="element.title" />
        </template>
      </Draggable>
    </div>
  </div>
</template>
