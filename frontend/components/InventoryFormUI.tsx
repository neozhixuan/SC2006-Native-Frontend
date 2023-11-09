import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import { useEffect, useState } from 'react';
import {Picker} from '@react-native-picker/picker';

type InventoryProps = {
    setPage: ()=>void;
}

const InventoryFormUI = (props: InventoryProps) => {
    const [itemNames, setItemNames] = useState([{label: "Test", value:"Test"}]);
    const [selectedValue, setSelectedValue] = useState("")

    const fetchItemNames = async () => {
      try {
        const response = await fetch('http://10.0.2.2:8000/fn/getItemNames');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        setItemNames(json);
        console.log(json);
        return json;
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(()=>{
        fetchItemNames();
    }, [])

    return(
        <View style={styles.mainBody}>
            <View style={styles.container}>
                <Text style={[styles.lightText, styles.headerText]}>Inventory Form (New Shipment)</Text>
                {/*Shipping Details*/}
                <Text style={[styles.lightText, styles.normalText]}>Enter shipment details*:</Text>
                <View style={styles.listStyle, styles.marginSmaller}>
                    <View style={styles.inputItem}>
                      <Picker
                        style={styles.inputName}
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) => {
                          setSelectedValue(itemValue);
                        }}
                      >
                        <Picker.Item label="Select an option..." value={null} />
                        {itemNames.map((item, index) => (
                          <Picker.Item label={item.label} value={item.value} key={index} />
                        ))}
                      </Picker>
                       <TextInput
                            style={styles.inputQty}
    //                             onChangeText={onChangeNumber}
    //                             value={number}
                            placeholder="Qty"
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                {/*Current Date and Time*/}
                <Text style={[styles.lightText, styles.normalText, styles.marginLarger]}>Enter current date and time:</Text>
                <View style={styles.listStyle, styles.marginSmaller}>
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
                {/*Expiry Date and Time*/}
                <Text style={[styles.lightText, styles.normalText, styles.marginLarger]}>Enter expiry date and time:</Text>
                <View style={styles.marginSmaller}>
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
                {/*Password*/}
                <Text style={[styles.lightText, styles.normalText, styles.marginLarger]}>Enter password:</Text>
                <View style={styles.listStyle, styles.marginSmaller}>
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
                {/* Rows of buttons */}
                <View style={styles.marginLarger}>
                   <Pressable style={styles.mainButton} onPress={() => Alert.alert('Submitted')}>
                        <Text style={[styles.buttonText, styles.normalText]}>Submit</Text>
                    </Pressable>
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
  inputItem:{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
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
       marginTop: '100%',
       flexDirection: 'column',
       gap: 3
   },
   inputName: {
       height: 20,
       width: "80%",
       backgroundColor: COLORS.light,
//        borderWidth: 2,        // Border width
//        borderColor: 'black',  // Border color
//        borderRadius: 8,       // Border radius (for rounded corners)
//        padding: 10,
   },
    inputQty: {
        height: 40,
        margin: 12,
       backgroundColor: COLORS.light,
       borderWidth: 2,        // Border width
       borderColor: 'black',  // Border color
       borderRadius: 8,       // Border radius (for rounded corners)
        padding: 10,
    },
   normalInput: {
       height: 40,
       width: "100%",
       backgroundColor: COLORS.light,
       borderWidth: 2,        // Border width
       borderColor: 'black',  // Border color
       borderRadius: 8,       // Border radius (for rounded corners)
       padding: 10,
   },
   marginSmaller:{
        marginTop: 20,
   },
      marginLarger:{
           marginTop: 40,
      }
});

export default InventoryFormUI;