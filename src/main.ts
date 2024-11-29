import { createApp } from 'vue'
import './index.scss'
import App from './App.vue'

import 'vuetify/lib/styles/main.css';
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'; // Import Material Design Icons


const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: "dark"
    },
    icons: {
        defaultSet: "mdi",
        aliases,
        sets: {
          mdi,
        },
      },
})

createApp(App).use(vuetify).mount('#app')
