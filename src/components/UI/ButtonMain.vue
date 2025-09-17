<script setup></script>

<template>
  <button class="button-main text bgc-purple-1 c-white w-medium">
    <slot />
  </button>
</template>

<style scoped lang="scss">
  .button-main {
    padding: 10px 20px;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: 8px;

    &:disabled {
      background-color: var(--purple-200);
      cursor: default;
    }

    &:hover:not(:disabled) {
      background-color: #2e32a9;
    }
  }
</style>
