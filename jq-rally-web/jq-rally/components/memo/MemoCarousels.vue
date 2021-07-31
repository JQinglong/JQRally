<template>
  <div>
    <v-carousel
      :continuous="false"
      cycle
      :show-arrows="false"
      height="300"
    >
      <v-carousel-item
        v-for="(memo, i) in memoList.results"
        :key="i"
      >
          <v-card>
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
              class="white--text align-start"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              width="600"
            >
              <v-card-title v-text="memo.title"></v-card-title>
            </v-img>

          </v-card>
      </v-carousel-item>
    </v-carousel>
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
    const colors= [
      'green',
      'secondary',
      'yellow darken-4',
      'red lighten-2',
      'orange darken-1',
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
      colors,
      ...toRefs(state),
      ...toRefs(memoState),
      fetchState,
    };
  },
});
</script>
