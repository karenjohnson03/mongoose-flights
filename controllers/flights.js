import { Flight } from '../models/flights.js'

function index(req, res){
  Flight.find({}, function (err, flights){
    console.log(err)
    res.render('flights/index', {
      flights,
      err,
      title: 'All Flights'
    })
  })
}

function newFlight(req, res) {
  res.render('flights/new',{
    title: 'Add Flight'
  })
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  const flight = new Flight(req.body)
  flight.save(function(err) {
    if (err) {
      return res.redirect('/flights/new')
    }
    res.redirect(`flights/${flight._id}`)
  })
}

function show(req, res) {
  Flight.findById(req.params.id, function(err, flight){
    res.render('flights/show',{
      flight,
      title: 'Flight Detail'
    })
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    flight.tickets.push(req.body)
    flight.save(function(err){
      res.redirect(`flights/${flights._id}`)
    })
  })
}

export {
  index,
  newFlight as new,
  create,
  show,
  createTicket
}