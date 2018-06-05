import Route from 'route-parser'
import _ from 'underscore'

let __ticketId = 1
const tickets = []

function listQuestions() {
  return Promise.resolve([{
      title: 'title1',
      content: 'content of question 1'
    },
    {
      title: 'title2',
      content: 'content of question2'
    }
  ])
}

function listTickets() {
  return Promise.resolve(tickets)
}

function createTicket(req) {
  let data = JSON.parse(req.body)
  data._id = (__ticketId++).toString()
  data.status = 'new'
  data.date = new Date()
  tickets.push(data)
}

function getTicket({
  id
}) {
  let obj = _.find(tickets, t => {
    return t._id === id
  })
  return Promise.resolve(obj)
}

function login(req) {
  let body = JSON.parse(req.body)
  return Promise.resolve({
    username: body.username
  })
}

function logout() {
  return Promise.resolve({
    status: 'ok'
  })
}

const resourcesFetches = {
  'http://localhost/questions': listQuestions,
  'http://localhost/tickets': listTickets,
  'http://localhost/tickets/new': createTicket,
  'http://localhost/ticket/:id': getTicket,
  'http://localhost/login': login,
  'http://localhost/logout': logout
}

let baseUrl

function $fetch(url, options) {
  let finalOptions = Object.assign({}, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    },
    options
  )
  let finalUrl = `${baseUrl}${url}`
  let handler
  Object.keys(resourcesFetches).forEach(key => {
    let route = new Route(key);
    let m = route.match(finalUrl)
    if (m) {
      if (!_.isEmpty(m)) {
        handler = resourcesFetches[key]
        finalOptions = m
      } else {
        handler = resourcesFetches[finalUrl]
      }
    }
  })
  return handler ? handler(finalOptions) : Promise.reject('Fetcher of url:[' + finalUrl + '] is not found!')
}

export default {
  install(Vue, options) {
    baseUrl = options.baseUrl
    Vue.prototype.$fetch = $fetch
  }
}
