<template>
  <div class="weather">
    <form v-on:submit.prevent="getWeather">
      <ion-grid class="transparent">
        <ion-row
          class="transparent"
          color="primary"
          justify-content-center
        >
          <ion-col class="transparent"
            align-self-center
            size-md="6"
            size-lg="5"
            size-xs="12"
          >
            <div class="transparent">
              <ion-item class="transparent">
                <ion-input
                  class="item-highlight item-inner-highlight transparent"
                  style="color: white; font-weight: bolder; font-size: larger;"
                  @ionChange="getCity"
                  type="text"
                  name="city"
                  placeholder="Introduza a cidade..."
                ></ion-input>
              </ion-item>
            </div>
            <ion-button
              style="background: transparent; font-weight: bolder;"
              v-bind:disabled="isDisabled"
              @click="presentLoading()"
              color="success"
              type="submit"
              >Obter</ion-button
            >
          </ion-col>
        </ion-row>
      </ion-grid>
    </form>
    <ion-grid style="background: transparent;">
      <ion-row
        style="background: transparent;"
        color="primary"
        justify-content-center
      >
        <ion-col
          style="background: transparent;"
          align-self-center
          size-md="6"
          size-lg="5"
          size-xs="12"
        >
          <ion-card
            style="background: transparent; box-shadow: 0 13px 26px 58px rgba(0,0,0,.2), 0 16px 53px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12); -webkit-box-shadow:  0 13px 26px 58px rgba(0,0,0,.2), 0 16px 53px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);"
          >
            <ion-card-header class="transparent">
              <ion-card-title style="color: white; font-weight: bolder;">{{ COUNTRY_CITY }}</ion-card-title>
            </ion-card-header>
            <ion-item
              style="--background: transparent;"
              lines="none"
              text-center
            >
              <ion-label
                      class="transparent"
                      style="color: white; font-weight: bolder;"
                >{{ DESCRIPTION }}</ion-label
              >
            </ion-item>
            <ion-item
              class="transparent"
              style="display: -webkit-inline-box !important; margin: 0 auto!important;"
              lines="none"
            >
              <ion-img :src="ICON" v-if="ICON" alt="Weather Icon"></ion-img>
              <ion-label
                class="transparent"
                style="color: white; font-weight: bolder;"
                >{{ TEMP ? 'Temp: ' + TEMP : '' }}</ion-label
              >
            </ion-item>
            <ion-item line="none" class="transparent">
              <ion-label
                class="transparent"
                style="color: white; font-weight: bolder;"
                > {{ TEMP_MIN ? 'Temp Min: ' + TEMP_MIN : ''  }}</ion-label
              >
              <ion-label
                style="color: white; font-weight: bolder;"
                class="transparent"
                > {{ TEMP_MAX ? 'Temp Max: ' + TEMP_MAX : '' }}</ion-label
              >
              <ion-label
                style="color: white; font-weight: bolder;"
                class="transparent"
                > {{ HUMIDITY ? 'Humidade: ' + HUMIDITY : ''  }}</ion-label
              >
            </ion-item>

            <ion-item v-if="MAP_URL">
              <img :src="MAP_URL" alt="">
            </ion-item>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>

  </div>
</template>

<script>

import {mapGetters} from 'vuex';
export default {
  name: "Weather",
  data() {
    return {
      city: "",
      API_KEY: "88bb501e45eb3e872c2d5a8ccbc500da",
      isDisabled: true,
    };
  },
  computed: {
    ...mapGetters([
      'HUMIDITY',
      'TEMP_MAX',
      'TEMP_MIN',
      'TEMP',
      'COUNTRY_CITY',
      'DESCRIPTION',
      'ICON',
      'MAP_URL',
    ])
  },
  methods: {
    getWeather(event) {
      this.city = event.target[0].value;
      if(this.city.trim() !== "") {
        this.$store.dispatch('FETCH_DATA', {
          city: event.target[0].value,
          API_KEY: this.API_KEY,
        })

      }
    },
    getCity(event) {
      event.detail.value.trim() !== ""
              ? (this.isDisabled = false)
              : (this.isDisabled = true);
    },
    presentLoading() {
      return this.$ionic.loadingController
        .create({
          message: "A Carregar...",
          duration: this.timeout,
          spinner: "bubbles",
          cssClass: "loading-class"
        })
        .then(l => {
          setTimeout(function() {
            l.dismiss();
          }, this.timeout);
          return l.present();
        });
    }
  }
};
</script>

<style scoped>

.transparent {
  background: transparent;
  --background: transparent;
}

.item-highlight,
.item-inner-highlight {
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  --background: green;
}

.loading-class {
  --spinner-color: green;
}
</style>
