<template>
  <div>
    <q-btn
      class="q-mr-sm"
      color="primary"
      label="新增"
      @click="$emit('add-user')"
    />
    <q-btn
      label="刪除"
      color="white"
      text-color="black"
      @click="$emit('confirm-handler')"
    />
  </div>
</template>
  
  <script>
export default {
  name: "AddUserButton",
};
</script>
  