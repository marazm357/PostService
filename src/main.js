import { createApp } from 'vue'
import App from '../src/App.vue'
import components from '@/components/UI'
import router from '@/router/router';
import directives from '@/directives';
import createStore from '@/store/index';

const app = createApp(App)
console.log(components)
components.forEach(component => {
  app.component(component.name, component)
})

directives.forEach(directive => {
  app.directive(directive.name, directive)
})

app
  .use(router)
  .use(createStore)
  .mount('#app')
