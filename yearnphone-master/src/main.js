import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Toast
import 'vant/es/toast/style';

// Dialog
import 'vant/es/dialog/style';

// Notify
import 'vant/es/notify/style';

// ImagePreview
import 'vant/es/image-preview/style';

createApp(App).use(store).use(router).mount('#app')
