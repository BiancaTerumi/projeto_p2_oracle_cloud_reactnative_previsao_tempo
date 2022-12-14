import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import { format } from 'date-fns';

const HistoryItem = ({link, data, cidade}) => {
  const formatedData = format(new Date(data), "dd/MM");

  return (
    <View style={styles.container}>
      <View style={styles.historyRow}>
        <Text style={styles.colorText}> {formatedData} </Text>
        <Text style={styles.colorText}> {cidade} </Text>
        <Image
          style={styles.icon}
          source={{
            uri: `http://openweathermap.org/img/wn/${link}@2x.png`,
          }}
        />
      </View>
    </View>
  );
};

export default HistoryItem;