import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'


//createApp(App).mount('#app')
const app = createApp(App)
app.use(createPinia())
app.mount('#app')