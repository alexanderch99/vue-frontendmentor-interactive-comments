<script setup>
  import { useDataStore } from "@/stores/data";

  import UserAvatar from "./UserAvatar.vue";

  const dataStore = useDataStore();

  const you = dataStore.isItMe(user.username);

  const { user } = defineProps(["user"]);
</script>

<template>
  <div class="user">
    <UserAvatar
      class="user__avatar"
      :avatar="user.image"
    />
    <div class="user__username c-grey-1 w-medium">{{ user.username }}</div>
    <div
      class="user__you bgc-purple-1 c-white"
      v-if="you"
    >
      you
    </div>
  </div>
</template>

<style scoped lang="scss">
  .user {
    display: flex;
    align-items: center;

    &__username {
      margin-left: 20px;
    }

    &__you {
      margin-left: 14px;
      padding: 0px 8px;
      border-radius: 4px;
    }
  }
</style>
