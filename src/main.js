import Vue from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import ToastPlugin from './utils/toastPlugin';

Vue.config.productionTip = false
Vue.prototype.$eventBus = new Vue();

Vue.use(ToastPlugin);


// 设置根字体大小
function setRem() {
    const baseSize = 37.5; // 基准字体大小，通常与设计稿的1rem = 37.5px相对应
    const scale = document.documentElement.clientWidth / 375; // 375是iPhone6的屏幕宽度，也可以根据你的设计稿宽度来设置
    document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px';
  }
  
  // 初始化设置
  setRem();
  
  // 监听窗口大小变化
  window.addEventListener('resize', setRem);
  

new Vue({
  render: h => h(App),
}).$mount('#app')

