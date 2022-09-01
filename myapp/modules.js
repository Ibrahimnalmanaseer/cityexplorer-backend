module.exports.display=class DisplayWeather{


    constructor(value)
    
    {
        this.forecast=value.current.condition.text;
        this.localTime=value.location.localtime;

    }

} 

