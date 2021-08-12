<template>
  <div>
    <v-card>
      <v-card-title class="headline">
        Login
      </v-card-title>
      <v-card-text>
        <singin-buttons />
      </v-card-text>
      <v-card-text>
        <firebase-auth />
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SinginButtons from '~/components/firebase/SinginButtons.vue'
import FirebaseAuth from '~/components/firebase/FirebaseAuth.vue'

export default defineComponent({
  components: { SinginButtons, FirebaseAuth }
})
</script>

<style>

</style>
