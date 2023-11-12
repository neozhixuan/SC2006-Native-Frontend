import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
  TextInput
} from 'react-native';
import { styles, COLORS } from "./styles";
import {Picker} from '@react-native-picker/picker';

// Chart Library //
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width - 60;
import {
  LineChart
} from "react-native-chart-kit";
///////////////////

import {useState, useEffect} from 'react';

type InventoryProps = {
    setPage: ()=>void;
}

const ViewPredictionsUI = (props: InventoryProps) => {
    const monthData = [
                    120.3, 119.8, 120.1, 120.5, 119.7, 120.2, 119.9, 120.4, 120.0, 120.1,
                    119.8, 120.2, 120.4, 119.9, 120.0, 119.7, 120.3, 120.1, 120.5, 119.8,
                    120.0, 120.2, 119.7, 120.4, 120.3, 119.9, 120.1, 119.8, 120.5, 120.0
                  ];
    const month = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    const [histoData, setHistoData] = useState(monthData);
    const [labels, setLabels] = useState(month)
    const [predictions, setPredictions] = useState([
                                                        {id: 0, name: "Apple", quantity: 10},
                                                        {id: 1, name: "Orange", quantity: 10},
                                                        {id: 2, name: "Guava", quantity: 15},
                                                       ]);
    const [timeframe, setTimeframe] = useState("1 month");
    const options = ["1 month", "1 week"]
    const fetchPredictions = async () => {
      try {
        const response = await fetch(
          'http://10.0.2.2:8000/api/predictions',
        );
        const json = await response.json();
        setPredictions(json);
        console.log(json);
        return json;
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(()=>{
        fetchPredictions();
    }, [])

    // Render each item in the list
    const renderItem = ({ item }) => (
      <View key={item.index} style={styles.listItem}>
        <View style={styles.inputName}><Text style={styles.normalText}>{item.name}</Text></View>
        <View style={styles.inputQty}><Text style={{textAlign: "center", fontWeight: "600"}}>{item.quantity}</Text></View>
      </View>
    );

    const setHistogramView = (itemValue) => {
        setTimeframe(itemValue);
        itemValue === "1 month" ? setHistoData(monthData) : setHistoData(monthData.slice(22,30));
        itemValue === "1 month" ? setLabels(month) : setLabels(month.slice(22,30));

    }

    const data = {
      labels: labels,
      datasets: [
        {
          data: histoData,
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 2 // optional
        }
      ],
      legend: ["Sales"] // optional
    };

    const chartConfig = {
      backgroundGradientFrom: COLORS.peach,
//       backgroundGradientFromOpacity: 0,
      backgroundGradientTo: COLORS.peach,
//       backgroundGradientToOpacity: 0.5,
//       color: COLORS.light,
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    };
    return(
        <View style={styles.mainBody}>
                   <View style={styles.container}>
                         <Text style={[styles.lightText, styles.headerText]}>Analytics</Text>
                         <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <Text style={[styles.lightText, styles.normalText, styles.marginSmaller]}>Data over {timeframe}</Text>
                            <Picker
                              style={{width: 150, backgroundColor: COLORS.light, height: 20}}
                              selectedValue={timeframe}
                              onValueChange={(itemValue, itemIndex) => setHistogramView(itemValue)}
                            >
                            {options.map((item, index) => (
                                <Picker.Item label={item} value={item} key={index} />
                            ))}
                            </Picker>
                         </View>
                         <View>
                             <LineChart
                               data={data}
                               width={screenWidth}
                               height={220}
                               chartConfig={chartConfig}
                             />

                         </View>
                       <Text style={[styles.lightText, styles.headerText]}>Usage Predictions</Text>
                      <View style={{marginBottom: 10}}>
                          <View style={styles.listStyle}>
                              <FlatList
                                data={predictions}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                              />
                          </View>
                         <Pressable style={[styles.mainButton, styles.marginSmaller]} onPress={() => props.setPage(0)}>
                              <Text style={[styles.buttonText, styles.normalText]}>Return</Text>
                          </Pressable>
                      </View>
                   </View>

        </View>
   )
}

export default ViewPredictionsUI;