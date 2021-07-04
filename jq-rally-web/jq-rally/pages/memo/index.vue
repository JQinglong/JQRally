<template>
  <div>
    <!-- メモ編集 -->
    <memo-admin />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from '@nuxtjs/composition-api'
import MemoAdmin from '~/components/memo/MemoAdmin.vue'

export default defineComponent({
  components: { MemoAdmin },
  setup() {
    return {
    }
  }
})
</script>
