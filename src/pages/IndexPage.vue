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
      <q-dialog v-model="showAddUserForm" persistent>
        <q-card>
          <q-card-section>
            <q-form @submit="addUser()">
              <q-input
                v-model="newUser.name"
                label="姓名"
                dense
                outlined
                clearable
                required
                :rules="[(val) => val.length !== 0 || '此欄位為必填']"
              />
              <q-input
                v-model.number="newUser.cellphone"
                label="手機"
                mask="(###) ### - ####"
                dense
                required
                outlined
                clearable
                unmasked-value
              />

              <q-input
                v-model="newUser.email"
                label="電子信箱"
                dense
                outlined
                required
                clearable
                :rules="[
                  (val, rules) =>
                    rules.email(val) || 'Please enter a valid email address',
                ]"
              />
              <div class="">
                <q-radio v-model="newUser.gender" label="男" val="男" />
                <q-radio v-model="newUser.gender" label="女" val="女" />
              </div>
              <q-date
                v-model="newUser.birthday"
                label="生日"
                dense
                outlined
                required
              />
              <q-card-actions align="right">
                <q-btn
                  flat
                  label="取消"
                  color="primary"
                  @click="showAddUserForm = false"
                />
                <q-btn type="submit" flat label="新增用戶" color="primary" />
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
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
export default {
  name: "IndexPage",
  components: {
    QTableWrapper,
    AddUserButton,
    DeleteConfirm,
  },
  setup() {
    const userInitial = {
      name: "",
      phone: "",
      email: "",
      gender: "男",
      birthday: ref("2019/02/01"),
    };
    const showAddUserForm = ref(false);
    const confirm = ref(false);
    const newUser = ref(userInitial);
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
    };
    const addUser = () => {
      let formData = { ...newUser.value }; // 使用 { ...newUser.value } 創建一個新的對象
      state.rows.unshift(formData);
      newUser.value = userInitial;
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
      newUser,
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
