import { View, Text, Image } from 'react-native';
import { styles } from './styles';

const WeatherItem = ({iconUrl, date, maxTemp, minTemp}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.dateText}>
          {date}     
        </Text>
        <View style={styles.weatherRow}>
          <Image style={styles.icon} source={{uri: iconUrl || "https://images.vexels.com/media/users/3/145137/isolated/preview/e6a965902c88e80552d448aa33cab165-icone-de-raios-nitidos-de-sol.png" }} />
          <Temp text={maxTemp} isMax/>
          <Temp text={minTemp}/>
        </View>
    </View>
  );
};

export default WeatherItem;


const Temp = ({text, isMax}) => {
  return (
    <View>
      <Text style={styles.tempText}>
        Temp  
      </Text>
      <Text style={styles.tempText}>
        {isMax? "max: " : "min: "}{text}°
      </Text>
    </View>
  )
}