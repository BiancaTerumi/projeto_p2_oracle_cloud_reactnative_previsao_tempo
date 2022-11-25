import React from "react";
import { Tab, TabView } from '@rneui/themed';
import { SafeAreaProvider} from 'react-native-safe-area-context';

import Search from "./src/screens/Search";
import History from "./src/screens/History";

export default function App() {

  const [index, setIndex] = React.useState(0);

  return (
    <SafeAreaProvider> 
      <>
        <Tab
          value={index}
          onChange={setIndex}
          containerStyle={{backgroundColor: "#243657", paddingTop: 30}}
          indicatorStyle={{
            backgroundColor: 'white',
            height: 3,
          }}
          variant="primary"
        >
          <Tab.Item
            title="Pesquisar"
            titleStyle={{ fontSize: 16 }}
          />
          <Tab.Item
            title="Histórico"
            titleStyle={{ fontSize: 16 }}
          />
        </Tab>

        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item style={{ width: '100%' }}>
            <Search/>
          </TabView.Item>
          <TabView.Item style={{ width: '100%' }}>
            <History/>
          </TabView.Item>
        </TabView>
      </>
    </SafeAreaProvider>
  );
}



