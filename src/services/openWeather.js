import axios from "axios";

export const openWeather = axios.create({
    baseURL: "https://api.openweathermap.org"
});