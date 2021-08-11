<template>
  <div>
    <v-card>
      <v-card-title>ログイン</v-card-title>
      <v-card-text>
        <v-btn
          color="blue-grey"
          class="ma-2 white--text"
          @click="google"
        >
          Sign in with Google
          <v-icon
            right
            dark
          >
            mdi-google
          </v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text>
        <v-btn
          color="blue-grey"
          class="ma-2 white--text"
          @click="facebook"
        >
          Sign in with Facebook
          <v-icon
            right
            dark
          >
            mdi-facebook
          </v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import {
  defineComponent
} from '@nuxtjs/composition-api'

import { injectGlobalState } from '@/compositions/states/user'
import firebase, { googleProvider } from '~/plugins/firebase'

export default defineComponent({
  name: 'SinginButtons',
  props: {
  },
  setup (_, { root }) {
    const gState = injectGlobalState()

    if (gState.user.value.uid) {
      // eslint-disable-next-line vue/no-mutating-props
      root.$router.push('/')
    }

    const google = () => {
      firebase.auth().signInWithRedirect(googleProvider)
      root.$router.push('/')
    }
    const facebook = () => {
      firebase.auth().signInWithRedirect(googleProvider)
      root.$router.push('/')
    }

    return {
      google,
      facebook
    }
  }
})
</script>
