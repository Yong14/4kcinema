import Vue from 'vue'
import MsgBox from './msgBox/MsgBox'

var MyContent = Vue.extend(MsgBox);

export let msgBox = (() => {
    var defaults = {
        title: '',
        address: '',
        change: '',
        cancel: '',
        handleCancel: null,
        handleChange: null
    }

    return function (ops) {
        for (var key in ops) {
            defaults[key] = ops[key];
        }

        let vm = new MyContent({
            el: document.createElement('div'),
            data: {
                title: defaults.title,
                address: defaults.address,
                change: defaults.change,
                cancel: defaults.cancel
            },
            methods: {
                handleCancel() {
                    defaults.handleCancel && defaults.handleCancel.call(this);
                    document.body.removeChild(vm.$el);
                },
                handleChange() {
                    defaults.handleChange && defaults.handleChange.call(this);
                    document.body.removeChild(vm.$el);
                }
            }
        })
        document.body.appendChild(vm.$el);
    }
    
})()