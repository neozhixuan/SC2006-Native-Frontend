import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
  TextInput
} from 'react-native';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width - 60;
import {
  LineChart
} from "react-native-chart-kit";

import {useState} from 'react';

type InventoryProps = {
    setPage: ()=>void;
}

const ViewPredictionsUI = (props: InventoryProps) => {
    const [histoData, setHistoData] = useState([1,2,3,4,5]);
    const mockData = [
     {id: 0, name: "Apple", quantity: 10},
     {id: 1, name: "Orange", quantity: 10},
     {id: 2, name: "Guava", quantity: 15},
    ]
    // Render each item in the list
    const renderItem = ({ item }) => (
      <View style={styles.listItem}>
        <Text style={styles.normalText}>{item.name}</Text>
        <Text style={styles.normalText}>{item.quantity}</Text>
      </View>
    );
    const data = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 2 // optional
        }
      ],
      legend: ["Rainy Days"] // optional
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
                        <Text style={[styles.lightText, styles.normalText]}>DATA ON DEMAND</Text>

                         <View>
                             <LineChart
                               data={data}
                               width={screenWidth}
                               height={220}
                               chartConfig={chartConfig}
                             />

                         </View>
                       <Text style={[styles.lightText, styles.headerText]}>Usage Predictions</Text>
                      <View>
                          <View style={styles.listStyle}>
                              <FlatList
                                data={mockData}
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

const COLORS = {
light: '#FBF5E6',
peach: '#C6847C',
buttonColor: '#EBCABC'
}

const styles = StyleSheet.create({
   mainBody: {
       height: '100%',
       flexDirection: 'column',
       padding: 30,
   },
   container: {
       flex: 1,
   },
   lightText:{
       color: COLORS.light
   },
   headerText:{
       fontSize: 30,
       fontWeight: 900
   },
   normalText:{
       fontSize: 20,
       fontWeight: 'bold'
   },
   listStyle:{
       flexDirection: 'column',
       width: '100%'
   },
   listItem:{
       flex: 1,
       flexDirection: 'row',
       width: '100%',
       justifyContent: 'space-between'
   },
   mainButton:{
       width: '100%',
       backgroundColor: COLORS.buttonColor,
       borderWidth: 2,        // Border width
       borderColor: 'black',  // Border color
       borderRadius: 8,       // Border radius (for rounded corners)
       padding: 7,
   },
   buttonText:{
       textAlign: 'center'
   },
   buttonSection:{
       marginTop: '70%',
       flexDirection: 'column',
       gap: 3
   },
      marginSmaller:{
           marginTop: 20,
      },
         marginLarger:{
              marginTop: 40,
         }
});

export default ViewPredictionsUI;