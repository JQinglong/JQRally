<template>
  <div>
    <v-list three-line dense>
      <template v-for="(item, index) in eventState.resourceList">
        <v-divider
          :key="index"
        />

        <v-list-item
          :key="item.title"
        >
          <v-list-item-avatar>
            <v-img :src="item.event_img" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.name" />
            <v-list-item-subtitle v-text="item.start_date" />
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, useFetch, defineComponent } from '@nuxtjs/composition-api'
import { useEvent } from '@/compositions'

export default defineComponent({
  name: 'EventList',
  setup () {
    const headers = [
      { text: 'タイトル', value: 'name' },
      { text: '開始日', value: 'start_date' },
      { text: '', value: 'actions', sortable: false }
    ]
    const state = reactive({
      search: '',
      filter: {},
      sortDesc: false
    })
    const { state: eventState, getList } = useEvent()

    const fetchData = async () => {
      await getList({ limit: 5 })
    }

    const { fetchState } = useFetch(() => fetchData())

    return {
      headers,
      ...toRefs(state),
      eventState,
      fetchState
    }
  }
})
</script>
