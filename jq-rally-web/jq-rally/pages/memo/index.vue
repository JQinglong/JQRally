<template>
  <div>
    <v-card dark>
      <v-card-title class="pa-2">
        <h3 class="title grow">メモ</h3>
      </v-card-title>
    </v-card>
    <!-- メモリスト -->
    <memo-list />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from '@nuxtjs/composition-api'
import MemoList from '~/components/memo/MemoList.vue'

export default defineComponent({
  components: { MemoList },
  setup() {
    return {
    }
  }
})
</script>
