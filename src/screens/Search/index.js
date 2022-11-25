import { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList, ActivityIndicator, TextInput, Alert } from 'react-native';

import { openWeather } from '../../services/openWeather.js'
import { oracle } from "../../services/oracle";

import WeatherItem from '../../components/WeatherItem';

import { styles } from './styles';
import { format } from 'date-fns';

const Search = () => {
    const [location, setLocation] = useState();
    const [weatherData, setWeatherData] = useState();
    const [loading, setLoading] = useState(false);

    const loadData = async () => {
        try {
            setLoading(true)

            const {data: [{lat, lon}]} = await openWeather.get(`/geo/1.0/direct?q=${location}&limit=1&appid=f9d70cfc392317a356ad14a57a7b67c9`);
            const { data: {daily}} = await openWeather.get(`/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alert&appid=f9d70cfc392317a356ad14a57a7b67c9`);

            setWeatherData(daily);
            saveHistoryData(daily, location);
        } catch(e) {
            Alert.alert("Não foi possível encontrar a localização")
        }finally{
            setLoading(false)
        }
    }

    const saveHistoryData =  (data, name) => {
        let formatData;

        data.map(async({ dt, weather }) => {
            formatData = {
              codigo_tempo: dt * 1000+"-"+name.toLowerCase(),
              link: weather[0]["icon"],
              cidade: `${name}`,
              data: new Date(dt * 1000).toISOString(),
            };
            try {
           await oracle.post("ords/admin/times/", formatData);
            }
            catch(e) {
            console.log(e?.response?.data?.message);
            }
        });
    }

    return (
        <View style={styles.container}>
            {!loading? <FlatList
            data={weatherData}
            keyExtractor={(item) => item.dt}
            ItemSeparatorComponent={ <View style={styles.separator}/>}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <WeatherItem
                date={format(item.dt*1000, "dd/MM/yyyy HH:mm")}
                maxTemp={item.temp.max}
                minTemp={item.temp.min}
                iconUrl={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                />
            }
            ListHeaderComponent={<Header location={location} setLocation={setLocation}/>}
            ListFooterComponent={<Footer onPress={loadData}/>}
            contentContainerStyle={styles.weatherList}
            />: <ActivityIndicator style={styles.loading} size="large" color="#243657"/>}
        </View>
    )
}

const Header = ({location, setLocation}) => {

    return (
        <View style={styles.cityContainer}>
            <TextInput style={styles.input} onChangeText={setLocation} value={location} placeholder={"Digite a cidade"} textAlign="center"/>
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

export default Search;
