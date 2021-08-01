<template>
  <div>
    <v-card>
      <v-card-title>{{ eventState.resourceData.name }}</v-card-title>
      <v-img height="250" :src="eventState.resourceData.event_img" />
      <v-card-subtitle>
        {{ eventState.resourceData.description }}
      </v-card-subtitle>
      <v-card-text> 開催期間　2021年8月1日〜2021年9月30日 </v-card-text>
      <v-card-actions>
        <v-btn color="primary" elevation="2" raised rounded x-large>
          <v-icon left>
            mdi-stamper
          </v-icon> イベントに参加する
        </v-btn>
      </v-card-actions>
      <v-alert border="left" colored-border color="teal" elevation="1" dense>
        スタンプ帳
      </v-alert>
      <StampBook :event-id="eventId" />
      <v-container fluid>
        <v-row dense>
          <v-col cols="4">
            <v-card>
              <v-alert
                border="left"
                colored-border
                color="teal"
                elevation="1"
                dense
              >
                スポット一覧
              </v-alert>
              <SpotTable :event-id="eventId" />
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
                参加者一覧・ランキング
              </v-alert>
              <event-user-table :event-id="eventId" />
            </v-card>
          </v-col>
          <v-col cols="2">
            <v-card>
              ・みんなの写真 ・みんなのコメント
              <v-card-actions>
                <v-spacer />

                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-card-actions>
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
import { useEvent } from '@/compositions'
import EventUserTable from '../user/EventUserTable.vue'

export default defineComponent({
  name: 'EventInfo',
  components: { EventUserTable },
  props: {
    eventId: {
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
    const { state: eventState, getData } = useEvent()

    const fetchData = async () => {
      await getData(props.eventId)
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
