import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { styles, COLORS } from "./styles";

type InventoryProps = {
    setPage: ()=>void;
}

const ViewInventoryUI = (props: InventoryProps) => {
    const [orders, setOrders] = useState([{id: 0, ItemName: "Test", Quantity: 10, ExpiryDate: "10 March"}, {id: 1, ItemName: "Test", Quantity: 10, ExpiryDate: "10 March"}])
    const [toggleAccordion, setToggleAccordion] = useState(null);

//     const downArrow = (
//         <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 330 330" xml:space="preserve">
//         <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
//         </svg>
//     )

//     const fetchOrders = async () => {
//       try {
//         const response = await fetch(
//           'http://10.0.2.2:8000/api/orderdata/',
//         );
//         const json = await response.json();
//         setOrders(json);
//         console.log(json);
//         return json;a
//       } catch (error) {
//         console.error(error);
//       }
//     };
//
//     useEffect(()=>{
//         fetchOrders();
//     }, [])

    // Render each item in the list
    const renderItem = ({ item }) => (
    <View key = {item.id}>
      <View style={{...styles.listItem, marginTop: 5}}>
        <Pressable onPress={()=>{toggleAccordion !== null ? setToggleAccordion(null) : setToggleAccordion(item.id)}} style={{...styles.inputName, flexDirection: "row", justifyContent: "space-between"}}><Text style={styles.normalText}>{item.ItemName}</Text><Text>\/</Text></Pressable>
        <View style={styles.inputQty}><Text style={{textAlign: "center", fontWeight: "600"}}>{item.Quantity}</Text></View>
      </View>
      {toggleAccordion === item.id && <View style={{...styles.inputName}}>
        <Text>Expiry Date: {item.ExpiryDate}</Text>
      </View>}
    </View>
    );

    return(
        <View style={styles.mainBody}>
            <View style={styles.container}>
                <Text style={[styles.lightText, styles.headerText]}>Inventory</Text>
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
                </View>
            </View>
        </View>
    )
}
export default ViewInventoryUI;