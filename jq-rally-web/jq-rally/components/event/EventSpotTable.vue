<template>
  <div>
    <v-card dense>
      {{ eventSpotState.resourceList }}
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
import { useEventSpot } from '@/compositions'

export default defineComponent({
  name: 'EventSpotTable',
  setup () {
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

    const fetchData = async (offset = 0) => {
      await getList({ offset })
    }

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
