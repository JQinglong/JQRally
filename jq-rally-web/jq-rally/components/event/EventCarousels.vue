<template>
  <div>
    <v-carousel
      :continuous="false"
      cycle
      :show-arrows="false"
      height="300"
    >
      <v-carousel-item
        v-for="(event, i) in eventState.resourceList"
        :key="i"
      >
        <v-card>
          <v-img
            :src="event.event_img"
            class="white--text align-start"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            width="600"
          >
            <v-card-title v-text="event.name" />
            <v-card-subtitle v-text="event.description" />
          </v-img>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, useFetch, defineComponent } from '@nuxtjs/composition-api'
import { useEvent } from '@/compositions'

export default defineComponent({
  name: 'EventCarousels',
  setup () {
    const headers = [
      { text: 'イベント名', value: 'name' },
      { text: '説明', value: 'description' },
      { text: '', value: 'actions', sortable: false }
    ]
    const colors = [
      'green',
      'secondary',
      'yellow darken-4',
      'red lighten-2',
      'orange darken-1'
    ]

    const state = reactive({
      search: '',
      filter: {},
      sortDesc: false
    })
    const { state: eventState, getList } = useEvent()

    const fetchData = async (offset = 0) => {
      await getList({ offset })
    }

    const { fetchState } = useFetch(() => fetchData())

    return {
      headers,
      colors,
      ...toRefs(state),
      eventState,
      fetchState
    }
  }
})
</script>
