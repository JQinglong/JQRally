<template>
  <div>
    <v-card dense>
      <v-data-table :headers="headers" :items="memoList.results" :search="search" dense>
        <template v-slot:top>
          <v-toolbar dense class="mb-1">
            <v-text-field
              dense
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
            ></v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon> mdi-note </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import {
  reactive,
  toRefs,
  useFetch,
  defineComponent,
} from "@nuxtjs/composition-api";
import { useMemo } from "@/compositions";
import MemoTableItem from "~/components/memo/MemoTableItem.vue";

export default defineComponent({
  name: "MemoTable",
  setup() {
    const headers = [
      { text: "タイトル", value: "title" },
      { text: "メモ", value: "memo" },
      { text: "", value: "actions" },
    ];
    const state = reactive({
      search: "",
      filter: {},
      sortDesc: false,
    });
    const { state: memoState, getMemoList } = useMemo();

    const fetchData = async (offset = 0) => {
      await getMemoList({ offset });
    };

    const { fetchState } = useFetch(() => fetchData());

    return {
      headers,
      ...toRefs(state),
      ...toRefs(memoState),
      fetchState,
    };
  },
});
</script>
