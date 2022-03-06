//KEY DE LA API


const API__KEY = "38fac3c0feda68f48def5eb5debc90b2";
const LANG = "es";





//OBTIENE LOS DATOS Y LOS PONE EN EL HTML

const displayData=(obj)=>{



	const weatherData={
		timezone:obj.list[0].name,
		humidity:parseInt(obj.list[0].main.humidity),
		min:parseInt(obj.list[0].main.temp_min),
		max:parseInt(obj.list[0].main.temp_max),
		degradeeNumber:parseInt(obj.list[0].main.temp),
		description:obj.list[0].weather[0].description
		
	}

	


	Object.keys(weatherData).forEach(key=>{
		document.getElementById(key).textContent = weatherData[key];
	});


}


//COMO ME COMUNICO CON LA API RAPID API


const getWeatherData = async (city)=>{
	const res = await fetch(`https://community-open-weather-map.p.rapidapi.com/find?q=${city}&units=metric&lang=${LANG}`, {
		"headers": {
			"x-rapidapi-key": "babdb21980mshdca1a142cae34e2p14e40djsn8b3e5df3e07e",
			"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"

		}});
	const data = await res.json();

	displayData(data);

}







//OBTIENE LOS DATOS DE LA API DEL TIEMPO 
function fetchData(positon) {
	const { latitude, longitude } = positon.coords;
	fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API__KEY}&lang=${LANG}`)
		.then(response => response.json())
		.then(data => setWeatherData(data));

		

}



//LLENA EL OBJETO PARA MOSTRAR EN PANTALLA 




const setWeatherData = data =>{
	

	const weatherData={
		timezone:data.name,
		humidity:parseInt(data.main.humidity),
		min:parseInt(data.main.temp_min),
		max:parseInt(data.main.temp_max),
		degradeeNumber:parseInt(data.main.temp),
		description:data.weather[0].description,
		
	}

	//REEMPLAZA EL HTML POR LOS DATOS QUE ENTREGA LA API

	Object.keys(weatherData).forEach(key=>{
		document.getElementById(key).textContent = weatherData[key];
	});

	

}


//BOTON "BUSCAR" PARA TRAER LA CIUDAD



function buscar() {
	const dato = document.getElementById("search__imput").value;
	document.getElementById("search__imput").value = "";

	getWeatherData(dato);
}



//CUANDO CARGA EL BODY TRAE LA LOCALIZACION ACTUAL


const onLoad = () =>{
	navigator.geolocation.getCurrentPosition(fetchData);
}




