
// Importeer het npm pakket express uit de node_modules map
// import express from 'express'
// import path from 'path'

const path = require('path')
const express = require('express')
// Import the path module for dirname function
// Importeer de zelfgemaakte functie fetchJson uit de/helpers map

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))

app.get('/', (req, res) => {
	res.render('index', {
		text: 'Vercel werkt hopelijk:)',
	})
})

module.exports = app