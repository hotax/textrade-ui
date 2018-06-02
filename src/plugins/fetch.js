function listQuestions() {
    return Promise.resolve([{
        title: 'title1',
        content: 'content of question 1'
    }, {
        title: 'title2',
        content: 'content of question2'
    }])
}

function login(req) {
    req.a = 1
    return Promise.resolve({})
}

const resourcesFetches = {
    'http://localhost:3000/questions': listQuestions,
    'http://localhost:3000/login': login
}

let baseUrl

function $fetch(url, options) {
    const finalOptions = Object.assign({}, {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }, options)
    return resourcesFetches[`${baseUrl}${url}`](finalOptions)
}

export default {
    install(Vue, options) {
        baseUrl = options.baseUrl
        Vue.prototype.$fetch = $fetch
    }
}
