<template>
  <q-table
    flat
    bordered
    :rows="data.rows"
    :columns="data.columns"
    row-key="name"
    selection="multiple"
    v-model:selected="tableSelected"
  ></q-table>
</template>

<script>
import { ref, watch } from "vue";
export default {
  props: {
    data: Object,
    selected: Array,
  },
  setup(props, { emit }) {
    const tableData = ref(props.data);
    const tableSelected = ref([...props.selected]);
    watch(tableSelected, (newValue) => {
      emit("update:selected", newValue);
    });
    return {
      tableSelected,
      tableData,
    };
  },
};
</script>
