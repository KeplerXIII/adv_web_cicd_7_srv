class TicketManager {
  constructor () {
    this.tickets = []
    this.nextId = 1
  }

  createTicket (name, description) {
    const newTicket = {
      id: this.nextId++,
      name: name,
      description: description,
      status: false,
      created: this.formatDateToDDMMYYYY(Date.now())
    }

    this.tickets.push(newTicket)
    return newTicket
  }

  ticketByID (id) {
    return this.tickets.find((ticket) => ticket.id === id)
  }

  switchTicketStatusByID (id) {
    const ticket = this.ticketByID(id)
    if (ticket) {
      ticket.status = !ticket.status
      return true
    } else {
      return false
    }
  }

  removeByID (id) {
    const index = this.tickets.findIndex((ticket) => ticket.id === id)
    if (index !== -1) {
      this.tickets.splice(index, 1)
      return true
    } else {
      return false
    }
  }

  deleteTicketById (id) {
    const index = this.tickets.findIndex((ticket) => ticket.id === id)
    if (index !== -1) {
      this.tickets.splice(index, 1)
      return true
    } else {
      return false
    }
  }

  formatDateToDDMMYYYY (timestamp) {
    const date = new Date(timestamp)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }

  editByID (id, newName, newDescription) {
    const ticket = this.ticketByID(id)
    if (ticket) {
      ticket.name = newName
      ticket.description = newDescription
      return true
    } else {
      return false
    }
  }
}

module.exports = TicketManager
