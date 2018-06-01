const data = {
    questions: [{
        title: 'title1',
        content: 'content of question 1'
    }, {
        title: 'title2',
        content: 'content of question2'
    }]
}

let baseUrl

function $fetch(url) {
    let result = data[url]
    return result ? Promise.resolve(result) :
        Promise.reject(url + ': not found !!!')
}

export default {
    install(Vue, options) {
        console.log('Installed!', options)
        baseUrl = options.baseUrl
        Vue.prototype.$fetch = $fetch
    }
}