<script setup>
  import { ref, onMounted } from "vue";

  import { useDataStore } from "@/stores/data";

  import UserAvatar from "./UserAvatar.vue";

  import TextareaMain from "./UI/TextareaMain.vue";
  import ButtonMain from "./UI/ButtonMain.vue";

  const dataStore = useDataStore();

  const { type, replyingTo, comment, mainComment, placeholderText } =
    defineProps([
      "type",
      "replyingTo",
      "comment",
      "mainComment",
      "placeholderText",
    ]);

  const emit = defineEmits(["hideReplyForm"]);

  const myAvatar = dataStore.getCurrentUser().image;

  const replyStart = replyingTo ? `@${replyingTo} ` : "";

  const newComment = ref(replyStart + "");

  const formatter = new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  function addCommentHC() {
    if (newComment.value.length < 1) return;

    const dateNow = Date.now();

    if (type == "send") {
      dataStore.addComment({
        id: dateNow,
        content: newComment.value,
        createdAt: formatter.format(dateNow),
        score: 0,
        user: dataStore.getCurrentUser(),
        replies: [],
        likes: [],
        dislikes: [],
      });
    } else if (type == "reply") {
      let formattedNewComment = newComment.value.split(" ");

      if (/\@.+/.test(formattedNewComment[0])) {
        formattedNewComment = formattedNewComment.slice(1).join` `;
      } else {
        formattedNewComment = formattedNewComment.join``;
      }

      dataStore.addReply(mainComment || comment, {
        id: dateNow,
        content: formattedNewComment,
        createdAt: formatter.format(dateNow),
        score: 0,
        replyingTo,
        user: dataStore.getCurrentUser(),
        likes: [],
        dislikes: [],
      });

      emit("hideReplyForm");
    } else {
      return;
    }

    newComment.value = "";
  }
</script>

<template>
  <div class="form-main-wrapper">
    <div class="container">
      <div class="add-comment bgc-white">
        <UserAvatar
          class="add-comment__avatar"
          :avatar="myAvatar"
        />
        <form
          action="#"
          class="form-main"
          @submit.prevent
        >
          <TextareaMain
            class="form-main__textarea"
            v-model="newComment"
            :placeholder="placeholderText || 'Add a comment...'"
          />
        </form>
        <ButtonMain
          class="add-comment__button"
          :disabled="newComment.length < 1"
          @click="addCommentHC"
          >{{ type }}</ButtonMain
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .add-comment {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin-top: -16px;
    margin-bottom: 20px;
    padding: 30px;
    border-radius: 10px;

    @media (max-width: 799.98px) {
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 20px;
    }

    &__avatar {
      @media (max-width: 799.98px) {
        order: 2;
      }
    }

    &__button {
      @media (max-width: 799.98px) {
        order: 3;
      }
    }
  }

  .form-main-wrapper {
    padding-bottom: 80px;
  }

  .form-main {
    width: 100%;

    &__textarea {
      @media (max-width: 799.98px) {
        width: 100%;
        order: 1;
      }
    }
  }

  .form-reply {
    padding-bottom: 0px;

    & .container {
      padding: 0px;

      @media (max-width: 899.98px) {
        min-width: revert;
      }
    }
  }
</style>
