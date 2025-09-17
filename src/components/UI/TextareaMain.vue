<script setup>
  import { ref } from "vue";

  const model = defineModel();

  const { placeholder } = defineProps(["placeholder"]);
  const isFocused = ref(false);
</script>

<template>
  <textarea
    name="textarea-main"
    id="textarea-main"
    class="textarea-main text c-grey-1"
    :placeholder="placeholder"
    @focus="isFocused = true"
    @blur="isFocused = false"
    v-model="model"
  ></textarea>
</template>

<style scoped lang="scss">
  .textarea-main {
    width: 100%;
    min-height: 140px;
    padding: 10px 20px;
    resize: none;
    border-radius: 10px;
    border: 1px solid lightgray;
    cursor: pointer;

    @media (max-width: 899.98px) {
      min-height: 120px;
    }

    &:focus {
      border: 1px solid var(--grey-800);
      cursor: text;
    }
  }
</style>
