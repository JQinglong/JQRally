<template>
  <v-row justify="center" align="start">
    <v-col cols="12" sm="6" md="8">
      <v-card class="logo py-4 d-flex justify-center">
        <EventCarousels />
      </v-card>
      <br>
      <v-alert
        border="left"
        colored-border
        color="teal"
        elevation="1"
        dense
      >
        開催中のイベント一覧
      </v-alert>
      <EventTable />
      <br>
      <v-alert
        border="left"
        colored-border
        color="teal"
        elevation="1"
        dense
      >
        過去のイベント
      </v-alert>
      <EventTable />
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
          最新イベント情報
        </v-alert>
        <EventList />
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
          ピックアップ イベント
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
