<template>
  <div>
    <v-card dense>
      <v-data-table
        :headers="headers"
        :items="memoList"
        :search="search"
        hide-default-header
        dense>
        <template v-slot:item="{ item }">
          {{ item }}
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, useFetch, defineComponent } from '@nuxtjs/composition-api';
import { useMemo } from '@/compositions';

export default defineComponent({
  name: 'MemoList',
  setup() {
    const headers = [
      { text: 'タイトル', value: 'title' },
      { text: 'メモ', value: 'memo' },
      { text: '', value: 'actions', sortable: false },
    ];
    const state = reactive({
      search: '',
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
