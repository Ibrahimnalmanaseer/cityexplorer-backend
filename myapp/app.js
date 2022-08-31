const express = require('express')
const app = express()
const cors=require('cors')
require('dotenv').config()
const port = process.env.PORT
app.use(cors())
const axios=require('axios')
const URL='http://api.weatherapi.com/v1/forecast.json';
const KEY='f17b33956c554c1b985234920223008';
const MOVIE_KEY='ec24eb4a018f6d39a3abb894b537b65c';
const MOVIE_URL='https://api.themoviedb.org/3/search/movie';






app.get('/', (req, res) => {

  

    res.send('Welcome to our website')
})




app.get('/getweather', getweatherHandler);

async function getweatherHandler(req,res){

    const reqCity = req.query.city;
    
    
    
     await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${reqCity}&days=1`).then((result)=>{
        let responsedData= result.data;
        let shapedData= new DisplayWeather(responsedData);
        res.send(shapedData);

        } );          

    return res.send()
      
}   

app.get('/movie',getMovieHandler);

async function getMovieHandler(req,res){

    const reqCity = req.query.city
    await axios.get(`${MOVIE_URL}?api_key=${MOVIE_KEY}&query=${reqCity}`).then((result)=>{
        
    // return array of movies .
    let lastResult= result.data.results;
    const allMovies=(Arr)=>{
    const movieArr=[] 
    Arr.forEach(element => {
    movieArr.push(new DisplayMovie(element));
    });
    return movieArr;
}
    res.send(allMovies(lastResult))
       })
}
  

   






class DisplayWeather{


    constructor(value)
    
    {
        this.forecast=value.current.condition.text;
        this.localTime=value.location.localtime;

    }

}

class DisplayMovie{


    constructor(value)
    
    {
        this.title=value.original_title;
        this.overview=value.overview;
        this.totalvotes=value.vote_count;
        this.average_votes=value.vote_average;
        this.image_url=value.poster_path;
        this.release_date=value.release_date
    }

}





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})