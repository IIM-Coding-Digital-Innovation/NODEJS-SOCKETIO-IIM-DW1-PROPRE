<template>
  <div class="flex flex-col items-center mt-10">
    <div class="w-full max-w-xs">
      <div>
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input
          type="text"
          placeholder="Enter your email"
          class="input input-bordered w-full"
          name="email"
        >
      </div>
      <div>
        <label class="label">
          <span class="label-text">Name</span>
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          class="input input-bordered w-full"
          name="name"
        >
      </div>
      <div>
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          class="input input-bordered w-full"
          name="password"
        >
        <label class="label">
          <span class="label-text-alt">6 character min.</span>
        </label>
      </div>
      <NuxtLink class="btn btn-primary w-full normal-case mt-4">
        Sign up
      </NuxtLink>
    </div>
  </div>
</template>
