import ErrorTipsModal from '../components/ErrorTipsModal/ErrorTipsModal.vue';

const ToastPlugin = {
  install(Vue) {
    const ToastConstructor = Vue.extend(ErrorTipsModal);
    const instance = new ToastConstructor();
    instance.$mount(document.createElement('div'));
    document.body.appendChild(instance.$el);

    Vue.prototype.$showToast = (message, duration) => {
      instance.show(message, duration);
    };
  }
};

export default ToastPlugin;
