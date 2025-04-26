import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(GoogleLogin, {
  clientId: '828668298867-3akqs5u9h9c5trop4b2fi9s0ngsahok5.apps.googleusercontent.com'
})

app.use(router)
app.mount('#app')
