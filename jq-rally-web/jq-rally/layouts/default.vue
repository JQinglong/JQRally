<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          dense
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list dense>
        <v-list-item
          v-for="(item, i) in adminitems"
          :key="i"
          :to="item.to"
          router
          exact
          height="32px"
        >
          <v-list-item-action class="my-1">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="green accent-1" dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon :to="'/'">
        <v-icon class="mx-4" large>
          mdi-postage-stamp
        </v-icon>
      </v-btn>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Let's スタンプラリー（絶賛開発中）</span>
      </v-toolbar-title>

      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-instagram</v-icon>
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-avatar
              v-if="user.uid && user.photoURL"
              size="36"
            >
              <img :src="user.photoURL" :alt="user.displayName">
            </v-avatar>
            <v-icon
              v-else
            >
              mdi-account
            </v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-if="user.uid"
            :to="'/settings'"
          >
            <v-list-item-avatar>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>設定</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-if="!user.uid"
            :to="'/login'"
          >
            <v-list-item-avatar>
              <v-icon>mdi-login</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-if="user.uid"
            @click="logOut"
          >
            <v-list-item-avatar>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <template #extension>
        <v-tabs
          background-color="white"
          align-with-title
        >
          <!-- >v-model="tab" は削除している-->
          <v-tabs-slider color="blue" />
          <v-tab
            v-for="item in tabitems"
            :key="item.title"
            :to="item.to"
          >
            {{ item.title }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} JQ</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import { provideGlobalState, injectGlobalState } from '@/compositions/states/user'
// import { auth, signOut } from '~/plugins/firebase'
// import { SignOut } from '~/compositions/firebase/auth'
import firebase from '~/plugins/firebase'

type Item = {
  icon: string;
  title: string;
  to: string;
};

export default defineComponent({
  name: 'DefaultLayout',

  // eslint-disable-next-line no-empty-pattern
  setup () {
    const clipped = ref(false)
    const drawer = ref(false)
    const fixed = ref(false)

    provideGlobalState()
    const gState = injectGlobalState()

    // eslint-disable-next-line no-console
    console.log('DefaultLayout gState', gState.user)

    onMounted(() => {
      // eslint-disable-next-line no-console
      console.log('onMounted gState', gState.user)

      if (gState.user.value.uid === '') {
        firebase.auth()
          .getRedirectResult()
          .then((result: any) => {
            if (result.credential) {
              /** @type {firebase.auth.OAuthCredential} */
              // const credential = result.credential

              // This gives you a Facebook Access Token. You can use it to access the Facebook API.
              // const token = credential.accessToken
              // ...
            }
            // The signed-in user info.
            const user = result.user
            // eslint-disable-next-line no-console
            console.log('getRedirectResult user', user)
            if (user) {
              gState.setUserState({
                uid: user ? user.uid : '',
                email: user && user.email ? user.email : '',
                displayName: user && user.displayName ? user.displayName : '',
                photoURL: user && user.photoURL ? user.photoURL : ''
              })
            } else {
              // eslint-disable-next-line no-console
              console.log('getRedirectResult out')
            }
          }).catch((error: any) => {
            // // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // // The email of the user's account used.
            // var email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
            // eslint-disable-next-line no-console
            console.log('getRedirectResult error', error)
          })
      }
    })

    const items = ref<Item[]>([
      {
        icon: 'mdi-home',
        title: 'ホーム',
        to: '/'
      },
      // {
      //   icon: 'mdi-apps',
      //   title: 'memo',
      //   to: '/memo'
      // },
      {
        icon: 'mdi-forum',
        title: 'メニュー１',
        to: '/menu1'
      },
      {
        icon: 'mdi-tooltip-account',
        title: 'メニュー２',
        to: '/menu2'
      },
      {
        icon: 'mdi-bookmark',
        title: 'メニュー３',
        to: '/menu3'
      }
    ])
    const adminitems = ref<Item[]>([
      {
        icon: 'mdi-pencil',
        title: 'Memo',
        to: '/memo'
      }
    ])

    const tabitems = ref<Item[]>([
      {
        icon: 'mdi-pencil',
        title: 'Memo',
        to: '/memo'
      },
      {
        icon: 'mdi-forum',
        title: 'メニュー１',
        to: '/menu1'
      }
    ])

    const logOut = () => {
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error: any) => {
        // An error happened.
        // eslint-disable-next-line no-console
        console.log('signOut error', error)
      })
      // eslint-disable-next-line no-console
      console.log('logOut', gState.user)
      gState.user.value.uid = ''
    }

    return {
      clipped,
      drawer,
      fixed,
      items,
      tabitems,
      adminitems,
      user: gState.user,
      logOut
      // stateGlobal,
      // signOut,
    }
  }
})
</script>

<style scoped>
.v-list-item__action {
  margin-top: 4px;
  margin-bottom: 8px;
}
</style>
