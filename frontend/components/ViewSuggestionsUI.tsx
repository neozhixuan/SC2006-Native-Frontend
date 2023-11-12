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
import { useForm, Controller } from 'react-hook-form';

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
    const [openTab, setOpenTab] = useState(suggestions[0].id);
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();

    const onSubmit = (formData, itemName) => {
        postData = {"ItemName": itemName, "Price": formData.price, "Description": formData.description};
        console.log(`Attempting to submit ${itemName} to marketplace with price of ${formData.Price} and description: ${formData.Description}`);

        fetch('http://10.0.2.2:8000/api/marketplace', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                // Add any other headers as needed
              },
              body: JSON.stringify(postData),
            })
              .then(response => response.json())
              .then(data => {
                // Handle the response data
                console.log(` ${itemName} submitted to marketplace with price of ${formData.Price} and description: ${formData.Description}`);
              })
              .catch(error => {
                // Handle errors
                console.error('Error sending POST request:', error);
              });
    };


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

    const changeTab = (id) => {
        setValue("Price", "");
        setValue("Description", "");
        setOpenTab(id);
    }


    // Render each item in the list
    const renderItem = ({ item }) => {
      return(<View style={styles.suggestionItem}>
        <Text style={{...styles.normalText, fontWeight:"900", marginBottom: 10}}>{item.ItemName}</Text>
        <View style={styles.listStyle}>
            {item.Ingredients.map((ingredient, idx)=>{
              return(<View key={idx} style={styles.listItem}>
                         <View style={styles.inputName}><Text style={styles.normalText}>{ingredient.Name}</Text></View>
                         <View style={styles.inputQty}><Text style={{textAlign: "center", fontWeight: "600"}}>{ingredient.Quantity}</Text></View>
                       </View>)
            })}
             {openTab !== item.id && <Pressable style={[styles.mainButton, styles.marginSmaller]} onPress={() => changeTab(item.id)}>
                  <Text style={[styles.buttonText, styles.normalText]}>Post on Marketplace</Text>
              </Pressable>}
            {/* Price */}
            {openTab === item.id && (<View>
            <Controller
              key={"Price"}
              control={control}
              render={({ field }) => (
              <View>
                    <Text style={[styles.normalText]}>Enter price of item:</Text>
                    <View style={styles.inputItem}>
                        <TextInput
                            style={styles.normalInput}
                            placeholder="Price"
                            keyboardType="numeric"
                            value={field.value}
                            onChangeText={(text)=>field.onChange(text)}
                        />
                    </View>
                    {errors["Price"] && <Text>{errors["Price"].message}</Text>}
               </View>
            )}
              name={"Price"}
              rules={{ required: `Price is required` }}
            />

            {/* Description */}
            <Controller
              key={"Description"}
              control={control}
              render={({ field }) => (
                  <View>
                      <Text style={[styles.normalText]}>Description:</Text>
                      <View style={styles.inputItem}>
                          <TextInput
                              style={styles.normalInput}
                              placeholder="Description"
                              keyboardType="default"
                              value={field.value}
                              onChangeText={(text)=>field.onChange(text)}
                          />
                      </View>
                      {errors["Description"] && <Text>{errors["Description"].message}</Text>}
                  </View>
              )}
              name={"Description"}
              rules={{ required: `Description is required` }}
            />
             <Pressable style={[styles.mainButton, styles.marginSmaller]} onPress={handleSubmit((formData) => onSubmit(formData, item.ItemName))}>
                  <Text style={[styles.buttonText, styles.normalText]}>Submit</Text>
              </Pressable></View>)}
          </View>
      </View>)
    };
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