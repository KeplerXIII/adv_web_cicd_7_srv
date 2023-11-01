const http = require('http')
const Koa = require('koa')
const koaBody = require('koa-body').default
const TicketManager = require('./ticketManager')

const app = new Koa()

const ticketManager = new TicketManager()
ticketManager.createTicket('Тестовая задача 1', 'Большое описание поставленной задачи.', true)
ticketManager.createTicket('Тестовая задача 2', 'Большое описание поставленной задачи.', false)
ticketManager.createTicket('Тестовая задача 3', 'Большое описание поставленной задачи.', true)

app.use(koaBody({
  urlencoded: true,
  multipart: true
}))

app.use(async ctx => {
  const { method, id, name, description } = ctx.request.query
  const idInt = parseInt(id)
  ctx.response.set('Access-Control-Allow-Origin', '*')
  ctx.response.set('Access-Control-Allow-Methods', 'GET, POST, DELETE')
  console.log(method, id)

  switch (method) {
    case 'allTickets':
      ctx.response.body = ticketManager.tickets
      return
    case 'ticketByID':
      ctx.response.body = ticketManager.ticketByID(idInt)
      return
    case 'switchByID':
      ctx.response.body = ticketManager.switchTicketStatusByID(idInt)
      return
    case 'removeByID':
      ctx.response.body = ticketManager.removeByID(idInt)
      return
    case 'createNew':
      ctx.response.body = ticketManager.createTicket(name, description)
      return
    case 'editByID':
      ctx.response.body = ticketManager.editByID(idInt, name, description)
      return
    default:
      ctx.response.status = 404
  }
})

const server = http.createServer(app.callback())

const port = 8800

server.listen(port, (err) => {
  if (err) {
    console.log(err)

    return
  }

  console.log('Server is listening to ' + port)
})
