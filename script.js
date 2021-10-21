const themeBtn = document.querySelector("#themeBtn");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
    document.body.classList.toggle("dark-theme");
} else if (currentTheme == "light") {
    document.body.classList.toggle("light-theme");
}
themeBtn.addEventListener("click", function() {
    if (prefersDarkScheme.matches) {
        document.body.classList.toggle("light-theme");
        let theme = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";
    } else {
        document.body.classList.toggle("dark-theme");
        let theme = document.body.classList.contains("dark-theme")
        ? "dark"
        : "light";
    }
    localStorage.setItem("theme", theme);
});

let weather = {
    apiKey: "fe24748fb9b03fd8deeae16a9fdb6480",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=imperial&appid="
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".location").innerText = name;
        document.querySelector(".condition-icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".condition-text").innerText = description;
        document.querySelector(".temperature").innerText = temp + " °F";
        document.querySelector(".humidity").innerText = "Precip: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind: " + speed + " mph";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-field").value);
    }
};
document.querySelector(".search-btn").addEventListener("click", function() {
    weather.search();
});
document.querySelector(".search-field").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
});
weather.fetchWeather("Austin");
