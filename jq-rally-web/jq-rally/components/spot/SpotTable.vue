<template>
  <div>
    <v-card dense>
      <v-data-table :headers="headers" :items="eventSpotState.resourceList" :search="search" dense>
        <template #top>
          <v-toolbar dense class="mb-1">
            <v-text-field
              v-model="search"
              dense
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
            />
          </v-toolbar>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-icon @click="$router.push(`/event/${item.event.id}/${item.id}/`)">
            mdi-note
          </v-icon>
        </template>
      </v-data-table>
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
  name: 'SpotTable',
  props: {
    eventId: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const headers = [
      { text: 'イベント名', value: 'name' },
      { text: '', value: 'actions' }
    ]
    const state = reactive({
      search: '',
      filter: {},
      sortDesc: false
    })
    const { state: eventSpotState, getList } = useEventSpot()

    const fetchData = async () => {
      await getList({ event: props.eventId })
    }

    // console.log('props.eventId', props.eventId)

    const { fetchState } = useFetch(() => fetchData())

    return {
      headers,
      ...toRefs(state),
      eventSpotState,
      fetchState
    }
  }
})
</script>
