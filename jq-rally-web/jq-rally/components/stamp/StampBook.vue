<template>
  <div>
    <v-row dense>
      <v-col v-for="(item, index) in eventSpotState.resourceList" :key="index" cols="2">
        <v-card>
          <v-card-subtitle v-text="item.name" />
          <v-img
            :src="item.stamp_img"
            class="white--text align-end"
            height="60px"
          />
          <v-card-actions>
            <v-spacer />
            <v-btn icon>
              <v-icon>mdi-stamper</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, useFetch, defineComponent } from '@nuxtjs/composition-api'
import { useEventSpot } from '@/compositions'

export default defineComponent({
  name: 'StampBook',
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
    const { state: eventSpotState, getList } = useEventSpot()

    const fetchData = async () => {
      await getList({ event: props.eventId })
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
