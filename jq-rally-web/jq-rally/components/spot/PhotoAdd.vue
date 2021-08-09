<template>
  <div>
    <v-card>
      <v-card-text>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="form.visit_date"
              label="訪問日"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="form.visit_date"
            no-title
            @input="menu = false"
          />
        </v-menu>
      </v-card-text>
      <v-card-text>
        <v-file-input
          v-model="form.photo"
          :rules="rules"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="画像選択"
          prepend-icon="mdi-camera"
          label="画像選択"
          dense
        />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" raised rounded @click="handleAddPhoto">
          <v-icon left>
            mdi-upload
          </v-icon> 写真を投稿する
        </v-btn>
      </v-card-actions>
      <v-snackbar
        v-model="snackbar"
      >
        更新しました。
        <template #action="{ attrs }">
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
  </div>
</template>

<script lang="ts">
import {
  reactive,
  toRefs,
  defineComponent
} from '@nuxtjs/composition-api'
import { useUserSpotPhoto } from '@/compositions'
import SpotPhotoTable from './SpotPhotoTable.vue'
import { EventSpotType, EventType } from '~/types'
import { defaultUserItem } from '~/compositions/util/const'

export default defineComponent({
  name: 'PhotoAdd',
  // eslint-disable-next-line vue/no-unused-components
  components: { SpotPhotoTable },
  props: {
    event: {
      type: Object as () => EventType,
      required: true
    },
    spot: {
      type: Object as () => EventSpotType,
      required: true
    }
  },
  setup (props) {
    const state = reactive({
      snackbar: false,
      rules: [
        (value: { size: number }) => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
      ],
      menu: false
    })
    const { createState, createData } = useUserSpotPhoto()

    const handleAddPhoto = async () => {
      try {
        createState.user = defaultUserItem
        createState.event = props.event
        createState.spot = props.spot
        const newData = await createData(createState)

        if (!newData) {
          return
        }
        state.snackbar = true
      } catch (error) {
        // console.log('error', error)
      }
    }

    return {
      form: createState,
      ...toRefs(state),
      handleAddPhoto
    }
  }
})
</script>
