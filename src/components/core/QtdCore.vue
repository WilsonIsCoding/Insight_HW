<template>
  <q-td :key="title" :props="props">
    <q-tooltip anchor="bottom middle" self="bottom middle">
      {{ props.row[title] }}
    </q-tooltip>
    {{ props.row[title] }}
  </q-td>
</template>

<script>
export default {
  props: {
    props: Object,
    title: String,
  },
};
</script>
