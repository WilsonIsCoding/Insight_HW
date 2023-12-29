<template>
  <q-dialog v-model="localConfirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">是否確定刪除這{{ selected.length }}筆資料？</span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="取消" color="primary" @click="cancel" />
        <q-btn flat @click="deleteConfirmed" label="確認" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { ref, watch } from "vue";

export default {
  props: {
    confirm: Boolean,
    selected: Array,
    confirmHandler: Function,
  },
  setup(props, { emit }) {
    const localConfirm = ref(props.confirm);
    watch(
      () => props.confirm,
      (newVal) => {
        localConfirm.value = newVal;
      }
    );
    const cancel = () => {
      emit("cancel");
    };
    const deleteConfirmed = () => {
      emit("delete-confirmed");
    };
    return {
      localConfirm,
      cancel,
      deleteConfirmed,
    };
  },
};
</script>
