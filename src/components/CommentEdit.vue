<script setup>
  import ButtonMain from "./UI/ButtonMain.vue";
  import TextareaMain from "./UI/TextareaMain.vue";

  import { useDataStore } from "@/stores/data";

  const dataStore = useDataStore();

  const { comment } = defineProps(["comment"]);
  const emit = defineEmits(["stopEdit"]);
  const model = defineModel();

  function editCommentHC() {
    dataStore.editComment(comment, model.value);
    emit("stopEdit");
  }
</script>

<template>
  <div class="comment-edit">
    <TextareaMain
      placeholder="Edit..."
      v-model="model"
    />
    <div class="comment-edit__button-wrapper">
      <ButtonMain
        class="comment-edit__button"
        :disabled="model.length < 1"
        @click="editCommentHC"
        >Update</ButtonMain
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
  .comment-edit {
    &__button {
      display: flex;
      margin-top: 10px;
      margin-left: auto;
    }
  }
</style>
