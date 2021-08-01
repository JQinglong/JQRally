<template>
  <div>
    <v-card>
      <v-card-title>{{ eventState.resourceData.name }}</v-card-title>
      <v-img height="250" :src="eventState.resourceData.spot_img" />
      <v-card-subtitle>
        {{ eventState.resourceData.description }}
      </v-card-subtitle>
      <v-card-text> {{ eventState.resourceData.address }} </v-card-text>
      <v-card-text> 写真を投稿する </v-card-text>
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

export default defineComponent({
  name: 'SpotInfo',
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
    const { state: eventState, getData } = useEventSpot()

    const fetchData = async () => {
      console.log('props.spotId', props.spotId)
      await getData(props.spotId)
    }

    const { fetchState } = useFetch(() => fetchData())

    return {
      ...toRefs(state),
      eventState,
      fetchState
    }
  }
})
</script>
