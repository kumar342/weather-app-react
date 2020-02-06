import React from 'react';
import ReactDOM from 'react-dom';
import  'bootstrap/dist/css/bootstrap.css' ;
import 'weather-icons/css/weather-icons.css'
import Weather from "./app_component/weather.component";
import Form from "./app_component/form.component";

const ApiKey="2c15f3d59274ce4d4aa897d9575ce0d6";

class App extends React.Component{
    constructor(){
        super();
        this.state={
            city: undefined,
            country:undefined,
            temp: undefined,
            temp_min:undefined,
            temp_max:undefined,
            description: "",
            error: false,
            icon: undefined
        };
    this.weatherIcon = {
            Thunderstorm: "wi-thunderstorm",
            Drizzle: "wi-sleet",
            Rain: "wi-storm-showers",
            Snow: "wi-snow",
            Atmosphere: "wi-fog",
            Clearsky: "wi-day-sunny",
            Clouds: "wi-day-fog"
        }
    }
    get_weatherIcon(icon,rangeId){
        switch(true){
            case rangeId>=200 && rangeId<=232 :
                this.setState({icon: this.weatherIcon.Thunderstorm});
                break;
            case rangeId>=300 && rangeId<=321 :
                 this.setState({icon: this.weatherIcon.Drizzle});
                 break;
            case rangeId>=500 && rangeId<=531 :
                 this.setState({icon: this.weatherIcon.Rain});
                 break;
            case rangeId>=600 && rangeId<=622 :
                 this.setState({icon: this.weatherIcon.Snow});
                 break;
            case rangeId>=701 && rangeId<=781 :
                 this.setState({icon: this.weatherIcon.Atmosphere});
                 break;
            case rangeId=800 :
                 this.setState({icon: this.weatherIcon.Clearsky});
                 break;
            case rangeId>=801 && rangeId<=804 :
                 this.setState({icon: this.weatherIcon.Clouds});
                 break;  
             default :
             this.setState({icon: this.weatherIcon.Clouds});           
        }
    }  
    
    getWeather = async(event)=>{
        event.preventDefault();
       const city = event.target.elements.city.value;
       const country = event.target.elements.country.value;
       
     if(city && country){
        const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${ApiKey}`);
        const data = await apiCall.json();
        console.log(data); 
        
        this.setState({
            city: `${data.name}, ${data.sys.country}`,
            temp : data.main.temp,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            description:data.weather[0].description
        });
        this.get_weatherIcon(this.weatherIcon, data.weather[0].id);
     }else{
         this.setState({error: true})
     }
        

}
    render(){
      return(
        <div className="App" >
         <Form  loadWeather={this.getWeather} error={this.state.error}/>  
         <Weather 
            city={this.state.city} 
            country={this.state.country}
            temp={this.state.temp}
            temp_min={this.state.temp_min}
            temp_max={this.state.temp_max}
            description={this.state.description}
            icon={this.state.icon}
            />
       </div>
      )
    }
  }

ReactDOM.render(<App />, document.getElementById('root'));

