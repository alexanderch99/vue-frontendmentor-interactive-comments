<script setup>
  import { onMounted, onUnmounted } from "vue";
  import ButtonMain from "./ButtonMain.vue";

  const emit = defineEmits(["closeModal", "submitDeleteComment"]);

  onMounted(() => {
    document.body.style.overflow = "hidden";
  });

  onUnmounted(() => {
    document.body.style.overflow = "auto";
  });
</script>

<template>
  <Teleport to="body">
    <div class="modal">
      <div class="modal__body text">
        <h1 class="modal__heading c-grey-1 w-medium">Delete comment</h1>
        <p class="modal__text c-grey-2">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div class="modal__buttons">
          <ButtonMain
            class="modal__button modal__button-no"
            @click="$emit('closeModal')"
            >No, cancel</ButtonMain
          >
          <ButtonMain
            class="modal__button modal__button-yes"
            @click="$emit('submitDeleteComment')"
            >Yes, delete</ButtonMain
          >
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;

    &__body {
      margin: 0 auto;
      width: 390px;
      padding: 40px 30px 30px 30px;
      border-radius: 10px;
      background-color: white;

      @media (max-width: 899.98px) {
        width: 350px;
        padding: 30px 20px 20px 20px;
      }
    }

    &__heading {
      font-size: 28px;

      @media (max-width: 899.98px) {
        font-size: 24px;
      }
    }

    &__text {
      margin-top: 20px;
    }

    &__buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

    &__button {
      @media (max-width: 899.98px) {
        font-size: 16px;
        flex: 0 0 150px;
      }

      &-no {
        background-color: #66727e;

        &:hover:not(:disabled) {
          background-color: #485562;
        }
      }

      &-yes {
        background-color: #ec636a;

        &:hover:not(:disabled) {
          background-color: #de363f;
        }
      }
    }
  }
</style>
