<template>
  <div>
    <v-list three-line dense>
      <template v-for="(item, index) in memoList">


        <v-divider
          :key="index"
        ></v-divider>

        <v-list-item
          :key="item.title"
        >
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.memo"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
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
