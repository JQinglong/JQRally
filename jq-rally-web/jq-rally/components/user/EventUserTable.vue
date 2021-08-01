<template>
  <div>
    <v-card dense>
      <v-data-table :headers="headers" :items="eventUserState.resourceList" dense>
        <template #[`item.actions`]="{ }">
          <v-icon> mdi-note </v-icon>
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
import { useEventSpot, useEventUser } from '@/compositions'

export default defineComponent({
  name: 'EventUserTable',
  props: {
    eventId: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const headers = [
      { text: '参加者名', value: 'user.name' },
      { text: '', value: 'actions' }
    ]
    const state = reactive({
      search: '',
      filter: {},
      sortDesc: false
    })
    const { state: eventUserState, getList } = useEventUser()

    const fetchData = async () => {
      await getList({ event: props.eventId })
    }

    // console.log('props.eventId', props.eventId)

    const { fetchState } = useFetch(() => fetchData())

    return {
      headers,
      ...toRefs(state),
      eventUserState,
      fetchState
    }
  }
})
</script>
