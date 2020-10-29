import express from 'express'
import apis from './routes/apis'
import views from './routes/views'

require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views', 'src/views')

app.use('/', views)
app.use('/apis', apis)

app.listen(5000, () => console.log('running'))
