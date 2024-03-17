const path = require('path')
const express = require('express')
const app = express()


import fetchJson from '../helpers/fetch-json.js'

// Haal alle images uit de WHOIS API op
const messages = []


const allData_houses = await fetchJson('https://fdnd-agency.directus.app/items/f_houses')
// file:///D:/OneDrive%20-%20HvA/jaar1/periode3/sprint7/lesmatariaal/S07W2-02-Filteren-sorteren.pdf
const favorite_houses = await fetchJson('https://fdnd-agency.directus.app/items/f_list')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))

app.get('/', (req, res) => {
	res.render('index', {
		text: 'Vercel met EJS en Node. For free :)',
	})
})

module.exports = app
