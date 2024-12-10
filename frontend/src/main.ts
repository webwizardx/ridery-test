import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { md3 } from 'vuetify/blueprints'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
  blueprint: md3,
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
})

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
