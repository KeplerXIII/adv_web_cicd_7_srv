const http = require('http')
const Koa = require('koa')
const koaBody = require('koa-body').default
const TicketManager = require('./ticketManager')

const app = new Koa()

const ticketManager = new TicketManager()
ticketManager.createTicket('Test', 'Long text', true)
ticketManager.createTicket('Test1', 'Long text1', false)
ticketManager.createTicket('Test3', 'Long text3', true)

app.use(koaBody({
  urlencoded: true,
  multipart: true
}))

app.use(async ctx => {
  const { method } = ctx.request.query
  const { id } = ctx.request.query
  const { name, description } = ctx.request.query
  ctx.response.set('Access-Control-Allow-Origin', '*')
  ctx.response.set('Access-Control-Allow-Methods', 'GET, POST, DELETE')
  console.log(method)

  switch (method) {
    case 'allTickets':
      ctx.response.body = ticketManager.tickets
      return
    case 'ticketByID':
      ctx.response.body = ticketManager.ticketByID(parseInt(id))
      return
    case 'switchByID':
      ctx.response.body = ticketManager.switchTicketStatusByID(parseInt(id))
      return
    case 'removeByID':
      ctx.response.body = ticketManager.removeByID(parseInt(id))
      return
    case 'createNew':
      ctx.response.body = ticketManager.createTicket(name, description)
      return
    // TODO: обработка остальных методов
    default:
      ctx.response.status = 404
  }
})

const server = http.createServer(app.callback())

const port = 6060

server.listen(port, (err) => {
  if (err) {
    console.log(err)

    return
  }

  console.log('Server is listening to ' + port)
})
