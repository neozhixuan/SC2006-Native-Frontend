import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert
} from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';

type InventoryProps = {
    setPage: ()=>void;
}

const ViewInventoryUI = (props: InventoryProps) => {
    const [orders, setOrders] = useState([{id: 0, name: "Test", quantity: 10}])
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          'http://10.0.2.2:8000/api/orderdata/',
        );
        const json = await response.json();
        setOrders(json);
        console.log(json);
        return json;
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(()=>{
        fetchOrders();
    }, [])

    // Render each item in the list
    const renderItem = ({ item }) => (
      <View style={styles.listItem}>
        <Text style={styles.normalText}>{item.ItemName}</Text>
        <Text style={styles.normalText}>{item.Quantity}</Text>
      </View>
    );

    return(
        <View style={styles.mainBody}>
            <View style={styles.container}>
                <Text style={[styles.lightText, styles.headerText]}>Inventory</Text>
                <Text style={[styles.lightText, styles.normalText]}>{orders.name}</Text>
                <View style={styles.listStyle}>
                    <FlatList
                      data={orders}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.id}
                    />
                </View>
                <View style={styles.buttonSection}>
                    <Pressable style={styles.mainButton} onPress={() => props.setPage(1)}>
                        <Text style={[styles.buttonText, styles.normalText]}>Fill in Inventory Form</Text>
                    </Pressable>
                    <Pressable style={[styles.mainButton, styles.marginSmaller]} onPress={() => props.setPage(2)}>
                        <Text style={[styles.buttonText, styles.normalText]}>View Daily Predictions</Text>
                    </Pressable>
                    <Pressable style={[styles.mainButton]} onPress={() => props.setPage(3)}>
                        <Text style={[styles.buttonText, styles.normalText]}>View Daily Suggestions</Text>
                    </Pressable>
                    {/*<Pressable style={[styles.mainButton]} onPress={fetchItemNames}>
                        <Text style={[styles.buttonText, styles.normalText]}>Fetch</Text>
                    </Pressable>*/}
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

export default ViewInventoryUI;