<template>
  <div>
    <v-card>
      <v-card-text>
        <v-btn
          color="blue-grey"
          class="ma-2 white--text"
          @click="login(0)"
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
          @click="login(1)"
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
import { googleProvider, facebookProvider } from '~/plugins/firebase.config'
import { SigninWithOAuth } from '~/compositions/firebase/auth'

export default defineComponent({
  name: 'SinginButtons',
  props: {
  },
  setup (_, { root }) {
    const userState = injectGlobalState()

    const provider = [googleProvider, facebookProvider]

    // if (userState.user.value.uid) {
    //   // eslint-disable-next-line vue/no-mutating-props
    //   root.$router.push('/')
    // }

    const login = async (value: number) => {
      try {
        const currentUser = await SigninWithOAuth(provider[value])
        if (currentUser.status === 'ok') {
          const userInfo = currentUser.data.user
          // eslint-disable-next-line no-console
          console.log('loginAuth', userState)

          userState.setUserState({
            uid: userInfo ? userInfo.uid : '',
            email: userInfo && userInfo.email ? userInfo.email : '',
            displayName: userInfo && userInfo.displayName ? userInfo.displayName : '',
            photoURL: userInfo && userInfo.photoURL ? userInfo.photoURL : ''
          })
        } else {
          alert('Authログイン失敗')
        }
        root.$router.push('/')
      } catch (e) {
        alert(e)
      }
    }

    return {
      login
    }
  }
})
</script>
