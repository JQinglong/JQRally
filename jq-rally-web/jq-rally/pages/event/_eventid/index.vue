<template>
  <div>
    <EventInfo :event-id="eventid" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const { params } = useContext()
    const { eventid } = params.value
    return {
      eventid
    }
  }
})
</script>
