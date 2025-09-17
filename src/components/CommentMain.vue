<script setup>
  import { ref } from "vue";

  import { useDataStore } from "@/stores/data";

  import CommentOption from "./CommentOption.vue";
  import CommentRate from "./CommentRate.vue";
  import UserMain from "./UserMain.vue";
  import ReplyMain from "./ReplyMain.vue";

  import IconReply from "./icons/IconReply.vue";
  import IconDelete from "./icons/IconDelete.vue";
  import IconEdit from "./icons/IconEdit.vue";
  import FormMain from "./FormMain.vue";
  import CommentEdit from "./CommentEdit.vue";

  const dataStore = useDataStore();

  const you = dataStore.isItMe(comment.user.username);

  const { comment, mainComment } = defineProps(["comment", "mainComment"]);
  const emit = defineEmits(["openModal"]);

  const isReply = ref(false);
  const isEdit = ref(false);

  function stopEdit() {
    isEdit.value = false;
  }

  const editContent = ref(comment.content);

  function hideReplyForm() {
    isReply.value = false;
  }

  function toggleReplyForm() {
    isReply.value = !isReply.value;
  }

  function deleteCommentHC(mainComment, id) {
    emit("openModal", mainComment, id);
  }
</script>

<template>
  <div class="comment-wrapper">
    <div class="comment bgc-white text">
      <div class="comment__options">
        <div
          class="comment__other"
          v-if="!you"
        >
          <CommentOption
            optionName="reply"
            @click="toggleReplyForm"
          >
            <IconReply />
          </CommentOption>
        </div>
        <div
          class="comment__my"
          v-else
        >
          <CommentOption
            optionName="delete"
            @click="deleteCommentHC(mainComment, comment.id)"
            v-if="!isEdit"
          >
            <IconDelete />
          </CommentOption>
          <!-- next option -->
          <CommentOption
            optionName="edit"
            @click="isEdit = !isEdit"
          >
            <IconEdit />
          </CommentOption>
        </div>
      </div>
      <CommentRate
        class="comment__rate"
        :score="comment.score"
        :user="comment.user"
        :comment="comment"
      />
      <div class="comment__body">
        <div class="comment__info">
          <UserMain
            class="comment__user"
            :user="comment.user"
          />
          <div class="comment__created-at c-grey-2">
            {{ comment.createdAt }}
          </div>
        </div>
        <div
          class="comment__content c-grey-2"
          v-if="!isEdit"
        >
          <span
            class="comment__replying-to c-purple-1"
            v-if="comment.replyingTo"
            >{{ "@" + comment.replyingTo + " " }}</span
          >
          <!--  
          -->{{ comment.content }}
        </div>
        <CommentEdit
          class="comment__edit"
          v-model="editContent"
          :comment="comment"
          @stopEdit="stopEdit"
          v-else
        />
      </div>
    </div>
    <FormMain
      v-if="isReply"
      type="reply"
      :replyingTo="comment.user.username"
      :comment="comment"
      :mainComment="mainComment"
      placeholderText="Add a reply..."
      @hideReplyForm="hideReplyForm"
      class="form-reply"
    />
    <div
      class="comment__replies"
      v-if="comment.replies?.length > 0"
    >
      <ReplyMain
        v-for="(reply, index) in comment.replies"
        :key="index"
        :reply="reply"
        :comment="comment"
        @openModal="deleteCommentHC"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .comment {
    position: relative;
    display: flex;
    margin: 30px 0px;
    padding: 20px;
    border-radius: 10px;

    @media (max-width: 899.98px) {
      padding: 10px 10px 76px 10px;
    }

    &__rate {
      @media (max-width: 899.98px) {
        position: absolute;
        bottom: 10px;
        left: 0;
      }
    }

    &__options {
      position: absolute;
      top: 30px;
      right: 4px;
      display: flex;

      @media (max-width: 899.98px) {
        top: revert;
        bottom: 24px;
        right: 10px;
      }
    }

    &__my,
    &__other {
      display: flex;
    }

    &__info {
      display: flex;
      align-items: center;
    }

    &__created-at {
      margin-left: 30px;

      @media (max-width: 899.98px) {
        margin-left: auto;
      }
    }

    &__body {
      width: 100%;
    }

    &__content {
      width: 100%;
      margin-top: 20px;
      overflow-wrap: break-word;
      white-space: pre-wrap;
    }

    &__replies {
      position: relative;
      padding-left: 120px;

      @media (max-width: 899.98px) {
        padding-left: 20px;
      }

      &::before {
        position: absolute;
        content: "";
        top: 8px;
        left: 58px;
        width: 4px;
        height: calc(100% - 16px);
        border-radius: 10px;
        background-color: #ecedf1;

        @media (max-width: 899.98px) {
          left: 4px;
          width: 2px;
        }
      }

      & > .wrapper {
        width: 100%;
      }
    }

    &__edit {
      margin-top: 20px;
    }
  }
</style>
