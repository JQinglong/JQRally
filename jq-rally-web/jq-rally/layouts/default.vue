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
      <v-divider></v-divider>
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
        <v-icon class="mx-4" large> mdi-postage-stamp </v-icon>
      </v-btn>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">サイト名</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
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
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <template v-slot:extension>
        <v-tabs
          background-color="white"
          align-with-title
        ><!-- >v-model="tab" は削除している-->
          <v-tabs-slider color="blue"></v-tabs-slider>
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
import { defineComponent, ref, onMounted } from "@vue/composition-api";
// import { provideGlobalState, injectGlobalState } from '@/compositions/states/user'
// import { auth } from '~/plugins/firebase.config'
// import { SignOut } from '~/compositions/firebase/auth'

type Item = {
  icon: string;
  title: string;
  to: string;
};

export default defineComponent({
  name: "DefaultLayout",

  setup(props: any, { root }) {
    const clipped = ref(false);
    const drawer = ref(false);
    const fixed = ref(false);

    const items = ref<Item[]>([
      {
        icon: "mdi-home",
        title: "ホーム",
        to: "/",
      },
      // {
      //   icon: 'mdi-apps',
      //   title: 'memo',
      //   to: '/memo'
      // },
      {
        icon: "mdi-forum",
        title: "メニュー１",
        to: "/menu1",
      },
      {
        icon: "mdi-tooltip-account",
        title: "メニュー２",
        to: "/menu2",
      },
      {
        icon: "mdi-bookmark",
        title: "メニュー３",
        to: "/menu3",
      },
    ]);
    const adminitems = ref<Item[]>([
      {
        icon: "mdi-pencil",
        title: "Memo",
        to: "/memo",
      },
    ]);

    const tabitems = ref<Item[]>([
      {
        icon: "mdi-pencil",
        title: "Memo",
        to: "/memo",
      },
      {
        icon: "mdi-forum",
        title: "メニュー１",
        to: "/menu1",
      },
    ]);

    // provideGlobalState()
    // const stateGlobal = injectGlobalState()

    // onMounted(() => {
    //   const publicPath = ["/signin","/signup"]
    //   if (stateGlobal.user.value.id === '') {
    //     auth.onAuthStateChanged((user) => {

    //       if (user) {
    //         stateGlobal.setUserState({
    //           id: user ? user.uid : '',
    //           email: user && user.email ? user.email : '',
    //           name: user && user.displayName ? user.displayName : '',
    //           thumbnail: user && user.photoURL ? user.photoURL : '',
    //         })
    //       } else {
    //         if (root.$route.path.indexOf('/admin') === 0) {
    //           root.$router.push('/login')
    //         }
    //       }
    //     })
    //   }
    // })

    // const signOut = () => {
    //   SignOut()

    // }

    return {
      clipped,
      drawer,
      fixed,
      items,
      tabitems,
      adminitems,
      // stateGlobal,
      // signOut,
    };
  },
});
</script>

<style scoped>
.v-list-item__action {
  margin-top: 4px;
  margin-bottom: 8px;
}
</style>