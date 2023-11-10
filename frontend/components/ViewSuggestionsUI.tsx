import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
  TextInput,
  ScrollView
} from 'react-native';
import { styles, COLORS } from "./styles";
import { useState, useEffect } from "react";

type InventoryProps = {
    setPage: ()=>void;
}

const ViewSuggestionsUI = (props: InventoryProps) => {
    const [suggestions, setSuggestions] = useState([{"id": 0,
     "ItemName": "Fillet o' Fish",
     "Ingredients": [{"Name": "Fish", "Quantity": 1}, {"Name": "Bun", "Quantity": 2}, {"Name": "Cheese", "Quantity" : 1}]
     },
     {"id": 1,
      "ItemName": "Fruit Bowl", "Ingredients": [{"Name": "Orange", "Quantity": 1}, {"Name": "Apple", "Quantity": 1}]}
     ]);

//     const fetchSuggestions = async () => {
//       try {
//         const response = await fetch(
//           'http://10.0.2.2:8000/api/suggestions',
//         );
//         const json = await response.json();
//         setSuggestions(json);
//         console.log(json);
//         return json;
//       } catch (error) {
//         console.error(error);
//       }
//     };
//
//     useEffect(()=>{
//         fetchSuggestions();
//     }, [])

    // Render each item in the list
    const renderItem = ({ item }) => (
      <View style={styles.suggestionItem}>
        <Text style={{...styles.normalText, fontWeight:"900", marginBottom: 10}}>{item.ItemName}</Text>
        <View style={styles.listStyle}>
        {item.Ingredients.map((ingredient, idx)=>{
          return(<View key={idx} style={styles.listItem}>
                     <View style={styles.inputName}><Text style={styles.normalText}>{ingredient.Name}</Text></View>
                     <View style={styles.inputQty}><Text style={{textAlign: "center", fontWeight: "600"}}>{ingredient.Quantity}</Text></View>

                   </View>)
        })}
        {/* Price */}
        <Text style={[styles.normalText]}>Enter expiry date and time:</Text>
        <View>
            <View style={styles.inputItem}>
                <TextInput
                    style={styles.normalInput}
//                             onChangeText={onChangeNumber}
//                             value={number}
                    placeholder="Item"
                    keyboardType="numeric"
                />

            </View>
        </View>
        </View>
        {/* Description */}
        <Text style={[styles.normalText]}>Description:</Text>
        <View>
            <View style={styles.inputItem}>
                <TextInput
                    style={styles.normalInput}
//                             onChangeText={onChangeNumber}
//                             value={number}
                    placeholder="Item"
                    keyboardType="text"
                />

            </View>
        </View>
         <Pressable style={[styles.mainButton, styles.marginSmaller]} onPress={() => null}>
              <Text style={[styles.buttonText, styles.normalText]}>Submit</Text>
          </Pressable>
      </View>
    );
    return(
            <ScrollView style={styles.mainBody}>
                   <View style={styles.container}>
                       <Text style={[styles.lightText, styles.headerText]}>View Suggestions</Text>
                      <View>
                      <View style={styles.listStyle}>
                          <FlatList
                            data={suggestions}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                          />
                      </View>
                     <Pressable style={[styles.mainButton, styles.marginSmaller]} onPress={() => props.setPage(0)}>
                          <Text style={[styles.buttonText, styles.normalText]}>Return</Text>
                      </Pressable>
                      </View>
                   </View>

               </ScrollView>)
}

export default ViewSuggestionsUI;