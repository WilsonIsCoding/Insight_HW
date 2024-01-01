<template>
  <q-table
    flat
    bordered
    :rows="data.rows"
    :columns="data.columns"
    row-key="name"
    selection="multiple"
    v-model:selected="tableSelected"
  >
    <template v-slot:header-selection="scope">
      <q-checkbox v-model="scope.selected" />
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td>
          <q-checkbox v-model="props.selected" />
        </q-td>
        <QtdCore title="name" :props="props" />
        <QtdCore title="cellphone" :props="props" />
        <QtdCore title="email" :props="props" />
        <QtdCore title="gender" :props="props" />
        <QtdCore title="birthday" :props="props" />
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { ref, watch } from "vue";
import QtdCore from "./core/QtdCore.vue";
export default {
  props: {
    data: Object,
    selected: Array,
  },
  components: {
    QtdCore,
  },
  setup(props, { emit }) {
    const tableData = ref(props.data);
    const tableSelected = ref([...props.selected]);
    watch(tableSelected, (newValue) => {
      emit("update:selected", newValue);
    });
    watch(
      () => props.selected,
      (newVal) => {
        tableSelected.value = newVal;
      }
    );
    return {
      tableSelected,
      tableData,
    };
  },
};
</script>
