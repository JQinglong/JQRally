<template>
  <div>
    <v-card>
      <v-card-title>{{ eventSpotState.resourceData.name }}</v-card-title>
      <v-img height="250" :src="eventSpotState.resourceData.spot_img" />
      <v-card-subtitle>
        {{ eventSpotState.resourceData.description }}
      </v-card-subtitle>
      <v-card-text> {{ eventSpotState.resourceData.address }} </v-card-text>
      <v-card-text> 写真を投稿する </v-card-text>
      <photo-add :event="eventSpotState.resourceData.event" :spot="eventSpotState.resourceData" />
      <v-card-text> コメントを投稿する </v-card-text>
      <v-card-actions>
        <v-btn color="primary" elevation="2" raised rounded x-large>
          <v-icon left>
            mdi-stamper
          </v-icon> スタンプを押す
        </v-btn>
      </v-card-actions>
      <v-container fluid>
        <v-row dense>
          <v-col cols="6">
            <v-card>
              <v-alert
                border="left"
                colored-border
                color="teal"
                elevation="1"
                dense
              >
                みんなの写真
              </v-alert>
              <spot-photo-table :spot-id="spotId" />
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card>
              <v-alert
                border="left"
                colored-border
                color="teal"
                elevation="1"
                dense
              >
                みんなのコメント
              </v-alert>
              <spot-comment-table :spot-id="spotId" />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import {
  reactive,
  toRefs,
  useFetch,
  defineComponent
} from '@nuxtjs/composition-api'
import { useEventSpot } from '@/compositions'
import SpotPhotoTable from './SpotPhotoTable.vue'
import SpotCommentTable from './SpotCommentTable.vue'
import PhotoAdd from './PhotoAdd.vue'

export default defineComponent({
  name: 'SpotInfo',
  components: { SpotPhotoTable, SpotCommentTable, PhotoAdd },
  props: {
    spotId: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const state = reactive({
      search: '',
      filter: {},
      sortDesc: false
    })
    const { state: eventSpotState, getData } = useEventSpot()

    const fetchData = async () => {
      // console.log('props.spotId', props.spotId)
      await getData(props.spotId)
    }

    const { fetchState } = useFetch(() => fetchData())

    return {
      ...toRefs(state),
      eventSpotState,
      fetchState
    }
  }
})
</script>
