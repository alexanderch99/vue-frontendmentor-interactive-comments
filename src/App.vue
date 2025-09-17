<script setup>
  import { ref } from "vue";

  import CommentMain from "./components/CommentMain.vue";
  import FormMain from "./components/FormMain.vue";
  import ModalDelete from "@/components/UI/ModalDelete.vue";

  import { useDataStore } from "./stores/data";

  const dataStore = useDataStore();

  const comments = dataStore.getComments();

  const isOpen = ref(false);

  const mainCommentForDel = ref(null);
  const idForDel = ref(null);

  function openModal(mainComment, id) {
    isOpen.value = true;

    mainCommentForDel.value = mainComment;
    idForDel.value = id;
  }

  function closeModal() {
    isOpen.value = false;

    mainCommentForDel.value = null;
    idForDel.value = null;
  }

  function submitDeleteComment() {
    dataStore.deleteComment(mainCommentForDel?.value, idForDel?.value);

    closeModal();
  }
</script>

<template>
  <ModalDelete
    v-if="isOpen"
    @closeModal="closeModal"
    @submitDeleteComment="submitDeleteComment"
  />
  <main class="main">
    <div class="container">
      <div class="comments">
        <CommentMain
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
          :mainComment="null"
          @openModal="openModal"
        />
      </div>
    </div>
  </main>
  <FormMain
    type="send"
    :replyingTo="null"
    :comment="null"
    :mainComment="null"
  />
</template>

<style scoped lang="scss">
  .comments {
    margin-bottom: 50px;
  }
</style>
