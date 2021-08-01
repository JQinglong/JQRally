<template>
  <div>
    <SpotInfo :spot-id="spotid" />
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
    const { eventid, spotid } = params.value
    return {
      eventid,
      spotid
    }
  }
})
</script>
