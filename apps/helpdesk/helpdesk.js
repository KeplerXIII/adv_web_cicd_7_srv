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
  ctx.response.set('Access-Control-Allow-Origin', '*')
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
    // TODO: обработка остальных методов
    default:
      ctx.response.status = 404
  }
})

// app.use((ctx, next) => {
//   if (ctx.request.method !== 'OPTIONS') {
//     next()
//     return
//   }

//   ctx.response.set('Access-Control-Allow-Origin', '*')
//   ctx.response.set('Access-Control-Allow-Methods', 'DELETE, PUT, PATCH, GET, POST')

//   ctx.response.status = 204
// })

// app.use((ctx, next) => {
//   if (ctx.request.method !== 'POST') {
//     next()

//     return
//   }

//   console.log(ctx.request.body)

//   const { name, phone } = ctx.request.body

//   ctx.response.set('Access-Control-Allow-Origin', '*')

//   if (subscriptions.some(sub => sub.phone === phone)) {
//     ctx.response.status = 400
//     ctx.response.body = 'subscription exists'

//     return
//   }

//   subscriptions.push({ name, phone })

//   ctx.response.body = 'OK'

//   next()
// })

// app.use((ctx, next) => {
//   if (ctx.request.method !== 'DELETE') {
//     next()

//     return
//   }

//   console.log(ctx.request.query)

//   const { phone } = ctx.request.query

//   ctx.response.set('Access-Control-Allow-Origin', '*')

//   if (subscriptions.every(sub => sub.phone !== phone)) {
//     ctx.response.status = 400
//     ctx.response.body = 'subscription doesn\'t exists'

//     return
//   }

//   subscriptions = subscriptions.filter(sub => sub.phone !== phone)

//   ctx.response.body = 'OK'

//   next()
// })

const server = http.createServer(app.callback())

const port = 6060

server.listen(port, (err) => {
  if (err) {
    console.log(err)

    return
  }

  console.log('Server is listening to ' + port)
})
