/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

/* Local css */
// import "@/assets/recursos/common/font-awesome.min.css"

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          // primary: '#1867C0',
          primary: '#0D47A1',
          secondary: '#5CBBF6',
        },
      },
    },
  },
})
