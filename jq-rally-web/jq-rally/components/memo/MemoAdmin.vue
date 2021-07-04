<template>
  <v-card>
    <v-card-title> メモの管理 </v-card-title>
    <v-card-text>
      <!-- メモ追加 -->
      <v-card>
        <v-card-text>
          <v-form lazy-validation>
            <v-text-field
              label="タイトル"
              dense
              outlined
              clearable
              v-model="form.title"
            >
            </v-text-field>
            <v-text-field
              label="メモ"
              dense
              outlined
              clearable
              v-model="form.memo"
            >
            </v-text-field>
            <v-btn color="primary" @click="handleCreateMemo">新規メモ</v-btn>
          </v-form>
        </v-card-text>
        <v-snackbar v-model="snackbar">
          更新しました。
          <template v-slot:action="{ attrs }">
            <v-btn
              color="success"
              outlined
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-card>

      <!-- メモ一覧 -->
      <v-data-table :headers="headers" :items="memoList" :search="search" dense>
        <template v-slot:top>
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
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>

      <v-dialog v-model="dialogEdit" max-width="500px">
        <v-card>
          <v-card-title class="headline">構成員情報更新</v-card-title>
          <v-text-field
            label="タイトル"
            dense
            outlined
            clearable
            v-model="editedItem.title"
          >
          </v-text-field>
          <v-text-field
            label="メモ"
            dense
            outlined
            clearable
            v-model="editedItem.memo"
          >
          </v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="updateItem">更新</v-btn>
            <v-btn color="blue darken-1" text @click="close"
              >Cancel</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="headline">削除しますか?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="deleteItemConfirm"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { PropType } from "vue";
import {
  Data,
  defineComponent,
  reactive,
  ref,
  toRef,
  toRefs,
  useFetch,
  onMounted,
} from "@nuxtjs/composition-api";
import { useMemo } from "@/compositions";
import { defaultMemoItem } from "@/compositions/util/const";

import { MemoType } from "@/types";

export default defineComponent({
  name: "MemoAdmin",
  setup(_, { root }) {
    const headers = [
      { text: "タイトル", value: "title" },
      { text: "メモ", value: "memo" },
      { text: "", value: "actions", sortable: false },
    ];

    const state = reactive({
      search: "",
      dialogDelete: false,
      dialogEdit: false,
      editedIndex: 0,
      editedItem: defaultMemoItem,
      snackbar: false,
    });

    const {
      state: memoState,
      createState: createMemoState,
      createMemo,
      updateMemo,
      getMemoList,
      deleteMemo,
    } = useMemo();

    const editItem = (item: MemoType) => {
      state.editedIndex = item.id;
      state.editedItem = item;
      console.log("item", state.editedItem);
      state.dialogEdit = true;
    };
    const updateItem = async () => {
      console.log("MemoAdmin updateItem", state.editedItem);
      await updateMemo({ id: state.editedItem.id, payload: state.editedItem });
      close();
    };
    const deleteItem = (item: MemoType) => {
      state.editedIndex = item.id;
      state.editedItem = item;
      state.dialogDelete = true;
    };
    const deleteItemConfirm = async () => {
      console.log("deleteItemConfirm", state.editedItem);
      const memoid: number = state.editedItem.id;
      deleteMemo(memoid);
      // fetchData()
      close();
    };
    const close = () => {
      state.dialogEdit = false;
      state.dialogDelete = false;
      root.$nextTick(() => {
        state.editedItem = Object.assign({}, defaultMemoItem);
        state.editedIndex = 0;
      });
    };

    const handleCreateMemo = async () => {
      try {
        console.log("createMemoState", createMemoState);
        const newMemo = await createMemo(createMemoState);

        if (!newMemo) {
          return;
        }
        state.snackbar = true;
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchData = async (offset = 0) => {
      await getMemoList({ offset });
      console.log("fetchData");
    };

    const { fetchState } = useFetch(() => fetchData());
    // console.log('fetchState', fetchState)

    return {
      headers,
      ...toRefs(state),
      fetchState,
      fetchData,
      ...toRefs(memoState),
      form: createMemoState,
      handleCreateMemo,
      editItem,
      updateItem,
      deleteItem,
      deleteItemConfirm,
      close,
    };
  },
});
</script>

<style>
</style>