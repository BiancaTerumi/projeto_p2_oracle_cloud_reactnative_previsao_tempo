import { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as Location from 'expo-location';

import { openWeather } from '../../services/openWeather.js'
import { oracle } from "../../services/oracle";

import WeatherItem from '../../components/WeatherItem';

import { styles } from './styles';

const Search = () => {
    const [locationData, setLocationData] = useState();
    const [weatherData, setWeatherData] = useState();
    const [loading, setLoading] = useState(false);

    const loadData = async () => {
        const {latitude, longitude} = locationData;

        try {
            setLoading(true)
            const [{ data: { hourly  } }, { data: [ { name, state } ] }] = await Promise.all(
                [
                  openWeather.get(`/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,daily,alert&appid=f9d70cfc392317a356ad14a57a7b67c9`),
                  openWeather.get(`/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=0&appid=f9d70cfc392317a356ad14a57a7b67c9`)
                ])

            setWeatherData(hourly);
            setLocationData((prev) => ({...prev, name, state}));
            saveHistoryData(hourly, name, state);
        } catch(e) {
            console.error(e)
        }finally{
            setLoading(false)
        }
    }

    const requestLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') throw new Error('Permission to access location was denied');

            const { coords } = await Location.getCurrentPositionAsync({});
            setLocationData(coords);
        } catch(e) {
            console.error(e)
        }
    }

    const saveHistoryData =  (data, name, state) => {
        let formatData;
        data.map(async({ dt, weather }) => {
            formatData = {
              codigo_tempo: dt * 1000,
              link: weather[0]["icon"],
              cidade: `${name}/${state}`,
              data: new Date(dt * 1000).toISOString(),
            };
            try {
           await oracle.post("ords/admin/times/", formatData);
            }
            catch(e) {
            console.log(e);
            }
        });
    }

    useEffect(() => {
        requestLocation();
    }, [])

    return (
        <View style={styles.container}>

            {!loading? <FlatList
            data={weatherData}
            keyExtractor={(item) => item.dt}
            ItemSeparatorComponent={ <View style={styles.separator}/>}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <WeatherItem
                date={new Date(item.dt * 1000).toLocaleString()}
                maxTemp={item.temp}
                minTemp={item.temp}
                iconUrl={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                />
            }
            ListHeaderComponent={<Header city={`${locationData?.name}/${locationData?.state}`} isEmpty={!!!weatherData}/>}
            ListFooterComponent={<Footer onPress={loadData}/>}
            contentContainerStyle={styles.weatherList}
            />: <ActivityIndicator style={styles.loading} size="large" color="#243657"/>}

        </View>
    )
}

export default Search;

const Header = ({city, isEmpty}) => {
    if(isEmpty) return null
    return (
        <View style={styles.cityContainer}>
            <Entypo name="location-pin" size={24} color="#243657" />
                <Text style={styles.cityText}>
                    {city}
                </Text>
            </View>
    )
}

const Footer = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.searchButton}>
        <Text style={styles.buttonText}>
            Pesquisar
        </Text>
    </TouchableOpacity>
    )
}
