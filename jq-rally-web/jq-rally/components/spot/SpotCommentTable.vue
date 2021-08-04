<template>
  <div>
    <v-card dense>
      <v-data-table :headers="headers" :items="spotCommentState.resourceList" :search="search" dense>
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
import { useUserSpotComment } from '@/compositions'

export default defineComponent({
  name: 'SpotCommentTable',
  props: {
    spotId: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const headers = [
      { text: '訪問日', value: 'visit_date' },
      { text: '', value: 'comment' },
      { text: '', value: 'actions' }
    ]
    const state = reactive({
      search: '',
      filter: {},
      sortDesc: false
    })
    const { state: spotCommentState, getList } = useUserSpotComment()

    const fetchData = async () => {
      await getList({ spot: props.spotId })
    }

    // console.log('props.eventId', props.eventId)

    const { fetchState } = useFetch(() => fetchData())

    return {
      headers,
      ...toRefs(state),
      spotCommentState,
      fetchState
    }
  }
})
</script>
