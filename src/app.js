const express = require ('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const port = process.env.PORT || 3001

//DEFINE PATHS FOR EXPRESS CONFIG

const app = express()
const publicDirect = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../template/views')  //
const partialpath = path.join(__dirname,'../template/partials')

//SET UP HANDLE BAR ENGINE AND VIEW LOCATION

app.set('view engine','hbs')
app.set('views',viewspath)  //
hbs.registerPartials(partialpath)

//SET UP STATIC DIRECTORY TO SERVE

app.use(express.static(publicDirect))



app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name:'Mukul'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        name:'Mukul'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        helptext:'This is some helpful text',
        name:'Mukul'
    })
})


app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
                error:'you must provide an address!'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location}={}) => {
        if(error){
            return res.send({error})
        }
        //forecast( data.longitude , data.latitude , (error, data2) => {
        forecast(longitude , latitude , (error, data2) => {
            if(error){
                return res.send({error})
                }
           
                res.send({
                    forecast:data2,
                    location:location,
                    address: req.query.address
                })
        })
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
                error:'you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})


app.get('*',(req,res) => {
    res.render('404',{
        title: 'ERROR PAGE',
        errormsg : '404 Error',
        name:'Mukul'
    })
    })
    app.listen (port,()=>{
        console.log('server is up on port' + port)
    })

/*app.listen (3001,()=>{
    console.log('server is up on port 3001')
})*/