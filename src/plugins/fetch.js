const tickets = []

function listQuestions () {
  return Promise.resolve([
    {
      title: 'title1',
      content: 'content of question 1'
    },
    {
      title: 'title2',
      content: 'content of question2'
    }
  ])
}

function listTickets () {
  return Promise.resolve(tickets)
}

function createTicket(req){
  tickets.push(JSON.parse(req.body))
}

function login (req) {
  let body = JSON.parse(req.body)
  return Promise.resolve({
    username: body.username
  })
}

function logout () {
  return Promise.resolve({
    status: 'ok'
  })
}

const resourcesFetches = {
  'http://localhost:3000/questions': listQuestions,
  'http://localhost:3000/tickets': listTickets,
  'http://localhost:3000/tickets/new': createTicket,
  'http://localhost:3000/login': login,
  'http://localhost:3000/logout': logout
}

let baseUrl

function $fetch (url, options) {
  const finalOptions = Object.assign(
        {},
    {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    },
        options
    )
  return resourcesFetches[`${baseUrl}${url}`](finalOptions)
}

export default {
  install (Vue, options) {
    baseUrl = options.baseUrl
    Vue.prototype.$fetch = $fetch
  }
}
