<template>
  <q-page class="row justify-left q-pa-lg">
    <div class="block-item">
      <div class="row justify-between items-center">
        <div class="text-h6">員工基本資訊</div>
        <div>
          <q-btn
            class="q-mr-sm"
            color="primary"
            label="新增"
            @click="showAddUserForm = true"
          />
          <q-btn
            label="刪除"
            color="white"
            text-color="black"
            @click="confirmHandler()"
          />
        </div>
      </div>

      <!-- 新增用戶表單 -->
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

      <q-table
        flat
        bordered
        :rows="state.rows"
        :columns="state.columns"
        row-key="name"
        selection="multiple"
        v-model:selected="selected"
      ></q-table>
      <div class="">
        <q-dialog v-model="confirm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <span class="q-ml-sm"
                >是否確定刪除這{{ selected.length }}筆資料？</span
              >
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="取消" color="primary" v-close-popup />
              <q-btn
                flat
                @click="deleteConform()"
                label="確認"
                color="primary"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script>
import { reactive, onMounted, ref } from "vue";
import axios from "axios";
import QTable from "src/components/QTable.vue";

export default {
  name: "IndexPage",

  components: {
    QTable,
  },

  setup() {
    const showAddUserForm = ref(false);
    const confirm = ref(false);
    const newUser = ref({ gender: "男", birthday: ref("2019/02/01") });
    const selected = ref([]);
    const state = reactive({
      columns: [
        {
          name: "name",
          label: "姓名",
          align: "left",
          field: "name",
          sortable: true,
        },
        {
          name: "cellphone",
          label: "手機",
          align: "left",
          field: "cellphone",
          sortable: true,
        },
        {
          name: "email",
          label: "信箱",
          align: "left",
          field: "email",
          sortable: true,
        },
        {
          name: "gender",
          label: "性別",
          align: "left",
          field: "gender",
          sortable: true,
        },
        {
          name: "birthday",
          label: "生日",
          align: "left",
          field: "birthday",
        },
      ],
      rows: [],
    });
    const formatBirthday = (isoDate) => {
      let date;
      const adjustDate = new Date(isoDate) == "Invalid Date";
      date = new Date(isoDate.slice(0, adjustDate ? 9 : 10));
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}/${month}/${day}`;
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
    };
    const addUser = () => {
      let formData = { ...newUser.value }; // 使用 { ...newUser.value } 創建一個新的對象
      state.rows.unshift(formData);
      newUser.value = {
        name: "",
        phone: "",
        email: "",
        gender: "男",
        birthday: ref("2019/02/01"),
      };
      showAddUserForm.value = false;
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
    };
  },
};
</script>

<style lang="scss" scoped>
.block-item {
  min-width: 400px;
}
</style>
