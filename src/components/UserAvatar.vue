<script setup>
  const { avatar } = defineProps(["avatar"]);
</script>

<template>
  <div class="user-avatar">
    <picture>
      <source
        :srcset="avatar.webp"
        type="image/webp"
      />
      <source
        :srcset="avatar.png"
        type="image/png"
      />
      <img
        :src="avatar.png"
        alt="avatar"
        loading
        width="48px"
        height="48px"
      />
    </picture>
  </div>
</template>

<style scoped>
  .user-avatar {
    user-select: none;
  }
</style>
