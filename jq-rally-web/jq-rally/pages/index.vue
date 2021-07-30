<template>
  <v-row justify="center" align="start">
    <v-col cols="12" sm="6" md="8">
      <v-card class="logo py-4 d-flex justify-center">
        <MemoCarousels />
      </v-card>
      <br>
      <v-alert
        border="left"
        colored-border
        color="teal"
        elevation="1"
        dense
      >
        Memo一覧
      </v-alert>
      <MemoTable />
      <EventTable />
      <EventSpotTable />
    </v-col>
    <v-col cols="6" md="4">
      <v-card>
        <v-alert
          border="left"
          colored-border
          color="teal"
          elevation="1"
          dense
        >
          LATEST
        </v-alert>
        <MemoList />
      </v-card>
      <br>
      <v-card>
        <v-alert
          border="left"
          colored-border
          color="teal"
          elevation="1"
          dense
        >
          EDITOR'S PICK
        </v-alert>
        <v-img
          height="250"
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        />
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>
