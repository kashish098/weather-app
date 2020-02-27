const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');

const path=require('path');
const express = require('express');
const app = express();
const port=process.env.PORT;
const hbs=require('hbs');


publicFolderPath=path.join(__dirname,'/../public');
viewpath=path.join(__dirname,'/../templates/views');
partialsPath=path.join(__dirname,'/../templates/partials');


app.set('view engine', 'hbs');
app.set('views',viewpath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicFolderPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        author:'kashish'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        author:'kashish'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        author:'kashish'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send('Please provide the address');
    }

    geocode(req.query.address,(error,{location,latitude,longitude}={})=>{
        if(error){
            return res.send({Error:error});        
        }
        forecast(latitude,longitude, (error, forecastData) => {
          if(error){
            return res.send({Error:error});
          }
        //   console.log('Location:',location);
          res.send({
              forecast:forecastData,
              location:location,
              address:req.query.address
          });
        })
        
    });
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 error',
        author:'kashish',
        errorMessage:'Furthur help not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 error',
        author:'kashish',
        errorMessage:'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})