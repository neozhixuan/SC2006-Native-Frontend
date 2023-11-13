import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { styles, COLORS } from "./styles";

import {ItemType} from "../App.tsx"

type InventoryProps = {
    setPage: ()=>void;
    orders: ItemType
}

const ViewInventoryUI = (props: InventoryProps) => {
    const [toggleAccordion, setToggleAccordion] = useState(null);
    let uniqueItems = []

    return(
        <ScrollView style={styles.mainBody}>
            <View style={{...styles.container, height: "80%"}}>
                <Text style={[styles.lightText, styles.headerText]}>Inventory</Text>
                <ScrollView style={{...styles.listStyle, height: 400}}>
                    {props.orders.map((item)=>{
                        if(uniqueItems.includes(item.ItemName)){
                            return;
                        }
                        uniqueItems.push(item.ItemName);
                        let qtys = 0;
                        let expiryList = []
                        for(order of props.orders){
                            if(order.ItemName === item.ItemName){
                                qtys += order.Quantity;
                                expiryList.push([order.Quantity, item.ExpiryDate]);
                            }
                        }
                        return(<View key = {item.id} style={{flex: 1}}>
                              <View style={{...styles.listItem}}>
                                <Pressable onPress={()=>{toggleAccordion !== null ? setToggleAccordion(null) : setToggleAccordion(item.id)}} style={{...styles.inputName, flexDirection: "row", justifyContent: "space-between"}}><Text style={styles.normalText}>{item.ItemName}</Text><Text style={{paddingRight: 5, fontSize: 20, fontWeight: 900}}>&darr;</Text></Pressable>
                                <View style={styles.inputQty}><Text style={{textAlign: "center", fontWeight: "600"}}>{qtys}</Text></View>
                              </View>
                          {toggleAccordion === item.id && <View style={{...styles.inputName, height: "fit-content"}}>
                            {expiryList.map((exp,index)=>(
                                <View key={index}>
                                    <Text>{exp[0]}x: {exp[1]}</Text>
                                </View>
                            ))}
                          </View>}
                        </View>)
                    })}

                </ScrollView>
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
        </ScrollView>
    )
}
export default ViewInventoryUI;