import Vue from 'vue'
import VeeValidate from 'vee-validate';
const config = {
    aria: true,
    classNames: {},
    classes: false,
    delay: 0,
    dictionary: null,
    errorBagName: 'errors', // change if property conflicts
    events: 'input|blur',
    fieldsBagName: 'fields',
    i18n: null, // the vue-i18n plugin instance
    i18nRootKey: 'validations', // the nested key under which the validation messages will be located
    inject: true,
    locale: 'zh_CN',
    strict: true,
    validity: false,
};
Vue.use(VeeValidate, config);

// 自定义validate 
const dictionary = {
    zh_CN: {
        //message ： 提示语。 
        //attributes： 就是 filed。
        messages: {
            email: () => '请输入正确的邮箱格式',
            required: (field) => "请输入" + field
        },
        attributes: {
            email: '邮箱',
            password: '密码',
            name: '账号',
            phone: '手机'
        }
    }
};

Validator.updateDictionary(dictionary);
