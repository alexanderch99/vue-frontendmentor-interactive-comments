<script setup>
  import { useDataStore } from "@/stores/data";

  import IconPlus from "@/components/icons/IconPlus.vue";
  import IconMinus from "@/components/icons/IconMinus.vue";

  const dataStore = useDataStore();

  const { score, user, comment } = defineProps(["score", "user", "comment"]);

  const you = dataStore.isItMe(user.username);

  function likeHC() {
    dataStore.addLike(comment);
  }

  function dislikeHC() {
    dataStore.addDislike(comment);
  }
</script>

<template>
  <div class="comment-rate text">
    <div
      class="comment-rate__plus"
      :class="{ active: dataStore.checkLike(comment) }"
    >
      <IconPlus
        class="comment-rate__icon"
        @click="likeHC"
        v-if="!you"
      />
    </div>
    <div class="comment-rate__score c-grey-1">{{ score }}</div>
    <div
      class="comment-rate__minus"
      :class="{ active: dataStore.checkDislike(comment) }"
    >
      <IconMinus
        class="comment-rate__icon"
        v-if="!you"
        @click="dislikeHC"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .comment-rate {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    justify-content: space-evenly;
    width: 50px;
    height: 120px;
    margin-right: 30px;
    margin-left: 10px;
    border-radius: 10px;
    background-color: #f5f6fa;

    @media (max-width: 899.98px) {
      flex-direction: row;
      width: 120px;
      height: 50px;
    }

    &__plus,
    &__minus {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
    }

    &__icon {
      padding: 10px;
      box-sizing: content-box;
    }

    &__plus.active {
      background-color: var(--purple-600);
    }

    &__minus.active {
      background-color: var(--grey-500);
    }

    &__score {
      cursor: default;
    }
  }
</style>
