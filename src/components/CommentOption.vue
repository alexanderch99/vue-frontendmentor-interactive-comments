<script setup>
  const { optionName } = defineProps(["optionName"]);
</script>

<template>
  <div class="comment-option">
    <span :class="`comment-option__${optionName}-icon comment-option__icon`">
      <slot />
    </span>
    <span
      :class="`comment-option__${optionName} comment-option__text w-medium`"
      >{{ optionName[0].toUpperCase() + optionName.slice(1) }}</span
    >
  </div>
</template>

<style scoped lang="scss">
  .comment-option {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 20px;
    user-select: none;

    &__icon {
      margin-right: 8px;
    }

    &__text {
      margin-bottom: -2px;
    }

    &__delete {
      color: #ed6368;
    }

    &__edit,
    &__reply {
      color: #5357b6;
    }
  }
</style>
