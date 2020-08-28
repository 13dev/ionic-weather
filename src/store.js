import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        city: null,
        country: null,
        icon: null,
        description: null,
        temp: null,
        tempMin: null,
        tempMax: null,
        humidity: null,
        mapUrl: null,
    },
    getters: {
        MAP_URL(state) {
            return state.mapUrl ? state.mapUrl : null
        },
        ICON(state) {
            return state.icon ? `https://openweathermap.org/img/w/${state.icon}.png` : '';
        },
        COUNTRY_CITY(state) {
            return state.country && state.city
                ? state.country + ', ' + state.city
                : 'Sem pais'
        },
        TEMP(state) {
            return state.temp ? state.temp + '°C' : '';
        },
        TEMP_MAX(state) {
           return state.tempMax ? state.tempMax + '°C' : '';
        },
        TEMP_MIN(state) {
            return state.tempMin ? state.tempMin + '°C' : '';
        },
        HUMIDITY (state) {
            return state.humidity ? state.humidity + '%' : '';
        },
        DESCRIPTION(state) {
            return state.description
                ? state.description.charAt(0).toUpperCase() + state.description.slice(1)
                : ''
        }
    },
    // state logic
    mutations: {
        SET_DATA(state, data) {
            state.city = data.name;
            state.country = data.sys.country;
            state.temp = data.main.temp;
            state.tempMin = data.main.temp_min;
            state.tempMax = data.main.temp_max;
            state.humidity = data.main.humidity;
            state.description = data.weather[0].description;
            state.icon = data.weather[0].icon;
        },

        SET_MAP_URL(state, data) {
            state.mapUrl = `https://www.mapquestapi.com/staticmap/v5/map?locations=${data.lat},${data.lon}&zoom=5&defaultMarker=marker-sm-22407F-3B5998&size=600,400@2x&key=JTF9N35vp4UhCpO2VlPACjm2FN2bTtSO&banner=${state.city}`;
        }
    },
    //Business logic
    actions: {
        async FETCH_DATA({commit}, data) {
            await axios
                .get(`https://api.openweathermap.org/data/2.5/weather?q=${data.city}&mode=json&lang=pt&units=metric&APPID=${data.API_KEY}`)
                .then(response => {
                    commit('SET_DATA', response.data);
                    commit('SET_MAP_URL', response.data.coord);
                }).catch(error => {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                        alert(`${error.response.status} - ${error.response.data.message}`);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
            })
        }
    },
});