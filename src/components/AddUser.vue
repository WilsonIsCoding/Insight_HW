<template>
  <q-dialog v-model="localShowAddUserForm" persistent>
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
              @click="closeShowAddUserForm()"
            />
            <q-btn type="submit" flat label="新增用戶" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { ref, watch } from "vue";
export default {
  props: {
    showAddUserForm: Boolean,
  },
  setup(props, { emit }) {
    const userInitial = {
      name: "",
      phone: "",
      email: "",
      gender: "男",
      birthday: ref("2019/02/01"),
    };

    const newUser = ref(Object.assign({}, userInitial));
    const localShowAddUserForm = ref(props.showAddUserForm);
    const closeShowAddUserForm = () => {
      localShowAddUserForm.value = false;
      emit("close-form");
    };
    const addUser = () => {
      emit("add-user", newUser.value);
      newUser.value = Object.assign({}, userInitial);
    };
    watch(
      () => props.showAddUserForm,
      (newVal) => {
        localShowAddUserForm.value = newVal;
      }
    );
    return {
      newUser,
      localShowAddUserForm,
      closeShowAddUserForm,
      addUser,
    };
  },
};
</script>