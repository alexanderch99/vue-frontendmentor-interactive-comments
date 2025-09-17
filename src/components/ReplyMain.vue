<script setup>
  import CommentMain from "./CommentMain.vue";

  const { reply, comment } = defineProps(["reply", "comment"]);
  const emit = defineEmits(["openModal"]);
</script>

<template>
  <CommentMain
    :comment="reply"
    :mainComment="comment"
    @openModal="$emit('openModal', comment, reply.id)"
  />
</template>

<style scoped></style>
