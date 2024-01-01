<template>
  <q-page class="row justify-left q-pa-lg">
    <div class="block-item">
      <div class="row justify-between items-center q-mb-md">
        <div class="text-h6">員工基本資訊</div>
        <add-user-button
          @add-user="showAddUserForm = true"
          @confirm-handler="confirmHandler"
        />
      </div>
      <q-input
        outlined
        v-model="searchText"
        label="請輸入搜索"
        @input="handleSearch"
      />
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
import { reactive, onMounted, ref, watch } from "vue";
import axios from "axios";
import QTableWrapper from "src/components/QTableWrapper.vue";
import AddUserButton from "src/components/UserBtn.vue";
import DeleteConfirm from "src/components/DeleteConfirm.vue";
import { fetchData } from "src/utils/getAllUser.js";
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
    const searchText = ref("");
    const state = reactive({
      columns: employeeTableHead,
      rows: [],
    });
    watch(searchText, async (newSearchText, oldSearchText) => {
      if (oldSearchText.length !== 0 && newSearchText.length == 0) {
        state.rows = await fetchData();
      } else {
        await handleSearch(newSearchText);
      }
    });
    const handleSearch = async (query) => {
      try {
        const response = await axios.post(
          "http://35.194.177.50:7777/members/search",
          {
            filter: {
              name: query,
            },
            sort: "-name",
          }
        );
        const { members } = response.data;
        if (members.length !== 0) {
          state.rows = members;
        } else {
          return;
        }
      } catch (error) {
        console.error("Error searching members:", error);
      }
    };
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
      state.rows = await fetchData();
    });
    return {
      selected,
      state,
      confirm,
      confirmHandler,
      showAddUserForm,
      deleteConform,
      handleSearch,
      addUser,
      updateSelected,
      searchText,
    };
  },
};
</script>
<style lang="scss" scoped>
.block-item {
  min-width: 400px;
}
</style>