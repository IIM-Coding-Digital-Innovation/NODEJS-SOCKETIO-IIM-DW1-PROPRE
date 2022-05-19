<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="card w-full h-48 bg-secondary-content shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-sm">
        {{ props.data.title }}
      </h2>
      <p class="text-xs">
        {{ props.data.content }}
      </p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">
          Done
        </button>
      </div>
    </div>
  </div>
</template>
