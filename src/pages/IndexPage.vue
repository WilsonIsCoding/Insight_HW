<template>
  <q-page class="row justify-left q-pa-lg">
    <div class="block-item">
      <div class="row justify-between items-center">
        <div class="text-h6">員工基本資訊</div>
        <add-user-button
          @add-user="showAddUserForm = true"
          @confirm-handler="confirmHandler"
        />
      </div>
      <add-user-form
        :showAddUserForm="showAddUserForm"
        @add-user="addUser"
        @close-form="showAddUserForm = false"
      ></add-user-form>
      <q-table-wrapper
        :data="state"
        :selected="selected"
        @update:selected="updateSelected"
      ></q-table-wrapper>
      <delete-confirm
        :confirm="confirm"
        :selected="selected"
        @cancel="confirm = false"
        @delete-confirmed="deleteConform"
      ></delete-confirm>
    </div>
  </q-page>
</template>
<script>
import { reactive, onMounted, ref } from "vue";
import axios from "axios";
import QTableWrapper from "src/components/QTableWrapper.vue";
import AddUserButton from "src/components/UserBtn.vue";
import DeleteConfirm from "src/components/DeleteConfirm.vue";
import formatBirthday from "src/utils/formatBirthday.js";
import { employeeTableHead } from "src/utils/employeeTableHead.js";
import AddUserForm from "src/components/AddUser.vue";
export default {
  name: "IndexPage",
  components: {
    QTableWrapper,
    AddUserButton,
    DeleteConfirm,
    AddUserForm,
  },
  setup() {
    const showAddUserForm = ref(false);
    const confirm = ref(false);
    const selected = ref([]);
    const state = reactive({
      columns: employeeTableHead,
      rows: [],
    });
    const confirmHandler = () => {
      if (selected.value.length === 0) {
        return;
      }
      confirm.value = true;
    };
    const deleteConform = () => {
      state.rows = state.rows.filter(
        (item1) => !selected.value.some((item2) => item2.name === item1.name)
      );
      confirm.value = false;
      selected.value = [];
    };
    const addUser = (userData) => {
      state.rows.unshift(userData);
      showAddUserForm.value = false;
    };
    const updateSelected = (newValue) => {
      selected.value = newValue;
    };
    onMounted(async () => {
      try {
        const response = await axios.get("http://35.194.177.50:7777/members");
        state.rows = response.data.members.map((member) => ({
          ...member,
          birthday: formatBirthday(member.birthday),
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });
    return {
      selected,
      state,
      confirm,
      confirmHandler,
      showAddUserForm,
      deleteConform,
      addUser,
      updateSelected,
    };
  },
};
</script>
<style lang="scss" scoped>
.block-item {
  min-width: 400px;
}
</style>
