// starting with the details of current location
let button = document.querySelector(".submit");
let appidGeo = "b45cec15d4c670d6e31f5e37b4e47ad9";

let inputCity = document.getElementById("city-name");
let cityName = inputCity.value;
let cities;
const searchCity = (name) => {




    fetch(
        `https://parseapi.back4app.com/classes/Indiacities_india_cities_database?limit=5000&order=ascii_name`,
        {
            headers: {
                'X-Parse-Application-Id': 'bkUzaIRvbyulThNsGymOIFYYozNxRFRCbBJ4wKlX', // This is your app's application id
                'X-Parse-REST-API-Key': 'rlwN92eVr9JqoD3ICeAglFOCTmrWhHO424A58X0W', // This is your app's REST API key
            }
        })
        .then(res => res.json())
        // Here you have the data that you need
        .then(data => {
            return data.results;
            // console.log(data.results)
        })
}

const citiesList = async () => {
    const result = await searchCity();
    console.log(result);
}




inputCity.addEventListener('keyup', (event) => {




})


function Icon_setter(icon) {
    let date = new Date()
    let hours = date.getHours();
    let timeDivider;
    if (hours < 19 && hours > 5) {
        timeDivider = "d";
    }
    else {
        timeDivider = "n"
    }

    let Icon_img = document.getElementById("weatherIcon")
    if (icon == "01d" || icon == "01n") {

        if (timeDivider == "d") {
            Icon_img.src = "icons/sun/26.png"

        }
        else {
            Icon_img.src = "icons/moon/10.png"
        }
    }

    else if (icon == "02d" || icon == "02n") {

        if (timeDivider == "d") {
            Icon_img.src = "icons/sun/27.png";
        }
        else {
            Icon_img.src = "icons/moon/31.png"
        }

    }

    else if (icon == "03d" || icon == "03n") {
        if (timeDivider == "d") {
            Icon_img.src = "icons/cloud/35.png"
        }
        else {
            Icon_img.src = "icons/moon/15.png"
        }

    }
    else if (icon == "04d" || icon == "04n") {
        if (timeDivider == "d") {
            Icon_img.src = "icons/cloud/35.png"

        }
        else {
            Icon_img.src = "icons/moon/14.png"
        }

    }
    else if (icon == "09d" || icon == "09n") {
        if (timeDivider == "d") {
            Icon_img.src = "icons/cloud/7.png";
        }
        else {
            Icon_img.src = "icons/moon/1.png"
        }

    }
    else if (icon == "10d" || icon == "10n") {
        if (timeDivider == "d") {
            Icon_img.src = "icons/cloud/22.png";
        }
        else {
            Icon_img.src = "icons/moon/21.png"
        }

    }
    else if (icon == "11d" || icon == "11n") {
        if (timeDivider == "d") {
            Icon_img.src = "icons/cloud/12.png";
        }
        else {
            Icon_img.src = "icons/moon/20.png"
        }

    }
    else if (icon == "13d" || icon == "13n") {
        if (timeDivider == "d") {
            Icon_img.src = "icons/cloud/23.png"
        }
        else {
            Icon_img.src = "icons/moon/40.png"
        }

    }
    else if (icon == "50d" || icon == "50n") {
        if (timeDivider == "d") {
            Icon_img.src = "icons/cloud/18.png"
        }
        else {
            Icon_img.src = "icons/moon/2.2.png"
        }

    }
}
function dayFinder(givenDate) {
    let unix_timestamp = givenDate
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();

    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    // console.log(formattedTime);
    // console.log(date.getDay());
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = weekday[date.getDay()];
    // console.log(day);

}
// setTimeout(() => {
//     document.getElementById("loader_sec").style.visibility = "hidden"
// }, 3000)

function myLocation() {
    if (!navigator) {
        alert("please allow location")
    }
    else {
        navigator.geolocation.getCurrentPosition((pos) => {

            let lon = pos.coords.longitude;
            let lat = pos.coords.latitude;
            fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${appidGeo}`)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        // console.log(data);
                        let cityName = data[0].name;
                        let country = data[0].country;
                        document.getElementById("cityName").innerText = cityName;
                        document.getElementById("country").innerText = ", " + country;
                    }
                    else {
                        console.log("no cities found")
                    }
                })

            fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${appidGeo}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        dayFinder(data.current.dt);
                        // console.log(data);
                        let temperature = data.current.temp;
                        let humidity = data.current.humidity;
                        let pressure = data.current.pressure;
                        let wind_speed = data.current.wind_speed;
                        let description = data.current.weather[0].description;
                        let icon = data.current.weather[0].icon;

                        // showing data dynamically
                        document.getElementById("description").innerText = description;
                        document.getElementById("temperature").innerText = temperature;
                        document.getElementById("humidity").innerText = humidity;
                        document.getElementById("wind_speed").innerText = wind_speed;
                        document.getElementById("pressure").innerText = pressure;
                        Icon_setter(icon);
                        document.getElementById("loader_sec").style.visibility = "hidden";

                    }



                })
                .catch(err => console.log(err))
        })

    }

}
window.addEventListener('load', () => {
    myLocation();
    // document.getElementById("loader_sec").style.visibility = "hidden";

});

// showing weather on searching

const showWeather = () => {
    // 
    let input = document.querySelector(".text").value;
    // console.log(input)
    if (input != "") {
        document.getElementById("loader_sec").style.visibility = "visible"
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=b45cec15d4c670d6e31f5e37b4e47ad9`)
            .then(res => res.json())
            .then(data => {

                let country = data[0].country;
                // console.log(country);
                let lat = data[0].lat;
                let lon = data[0].lon;
                let cityName = data[0].name;

                document.getElementById("cityName").innerText = cityName;
                document.getElementById("country").innerText = ", " + country;
                fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${appidGeo}&units=metric`)
                    .then(response => response.json())
                    .then(data => {
                        // console.log(data)
                        dayFinder(data.current.dt);


                        let temperature = data.current.temp;
                        let humidity = data.current.humidity;
                        let pressure = data.current.pressure;
                        let wind_speed = data.current.wind_speed;
                        let description = data.current.weather[0].description;
                        let icon = data.current.weather[0].icon;

                        // showing data dynamically
                        document.getElementById("description").innerText = description;
                        document.getElementById("temperature").innerText = temperature;
                        document.getElementById("humidity").innerText = humidity;
                        document.getElementById("wind_speed").innerText = wind_speed;
                        document.getElementById("pressure").innerText = pressure;
                        Icon_setter(icon)
                        document.getElementById("loader_sec").style.visibility = "hidden";
                    })
                    .catch(err => alert(err))



            })
    }

    else {
        alert('Please enter a city name')
    }

    document.querySelector(".text").value = ""

}



button.addEventListener('click', () => {


    showWeather()
    // setTimeout(() => {
    //     document.getElementById("loader_sec").style.visibility = "hidden"
    // }, 3000)
})


window.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        button.click();
    }
})