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
        >
        <label class="label">
          <span class="label-text-alt">6 character min.</span>
          <a class="label-text-alt link link-primary">Forgot password</a>
        </label>
      </div>
      <NuxtLink class="btn btn-primary w-full normal-case mt-4">
        Sign in
      </NuxtLink>
    </div>
  </div>
</template>
