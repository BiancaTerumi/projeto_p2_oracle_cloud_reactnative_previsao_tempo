import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
  } from "react-native";
  import { useState, useEffect } from "react";
  import HistoryItem from "../../components/HistoryItem";
  import { styles } from './styles';
  import { oracle } from '../../services/oracle'
  
  const History = () => {
      const [historyData, setHistoryData] = useState([]);
      const [loading, setLoading] = useState(false);
  
      const loadHistoryData = async () => {
          setLoading(true)
  
          try {
              const { data: { items } } = await oracle.get("ords/admin/times/?limit=2000"); 
              setHistoryData(items.sort((a, b) => b.id - a.id));
          } catch(e) {
              console.error(e)
          } finally {
              setLoading(false);
          }
      }
  
      useEffect(() => {
          loadHistoryData()
      }, []);
  
       return (
         <View style={styles.container}>
           {!loading ? (
             <FlatList
               data={historyData}
               keyExtractor={(item) => item.id}
               ItemSeparatorComponent={<View style={styles.separator} />}
               showsVerticalScrollIndicator={false}
               renderItem={({ item }) => (
                 <HistoryItem
                   data={item.data}
                   link={item.link}
                   cidade={item.cidade}
                 />
               )}
               ListFooterComponent={<Footer onPress={loadHistoryData} />}
               contentContainerStyle={styles.weatherList}
             />
           ) : (
             <ActivityIndicator
               style={styles.loading}
               size="large"
               color="#243657"
             />
           )}
         </View>
       );
  }
  
  const Footer = ({onPress}) => {
      return (
          <TouchableOpacity onPress={onPress} style={styles.searchButton}>
          <Text style={styles.buttonText}>
              Atualizar
          </Text>
      </TouchableOpacity>
      )
  }
  
  export default History;
      
  
  