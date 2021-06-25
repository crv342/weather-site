const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))
app.get('', (req, res) => {
    res.render('index', { title: 'Weather', name: 'chirag viradiya' })
})

app.get('/weather', (req, res) => {
    if (!req.query.search) {
        return res.send('please provide an address')
    }
    geocode(req.query.search, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({ location, forecastData })
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'about', name: 'chirag viradiya' })
})

app.get('/about/*', (req, res) => {
    res.render('404', { title: 'error', errorMsg: 'About', name: 'chirag' })
})

app.get('*', (req, res) => {
    res.render('404', { title: '404', errorMsg: '404', name: 'chirag' })
})

app.listen(3000, () => {
    console.log('server is running...');

})