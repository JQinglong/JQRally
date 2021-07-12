<template>
  <div>
    <v-card>
      <v-card-title v-text="memo.title"></v-card-title>
      <v-card-text> {{ memo.memo }} </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-note</v-icon>
        </v-btn>

      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { defineComponent } from '@nuxtjs/composition-api';
import { MemoType } from "@/types";
export default defineComponent({
  name: 'MemoCard',
  props: {
    memo: {
      type: Object as () => PropType<MemoType>,
      required: true,
    },
  },
  setup(props, { root }) {
    return {

    };
  },
});
</script>
