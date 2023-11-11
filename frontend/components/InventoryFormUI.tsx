import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Button,
  Platform,
  Alert,
  TextInput,
} from 'react-native';
import { useEffect, useState } from 'react';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles, COLORS } from "./styles";

type InventoryProps = {
    setPage: ()=>void;
}

const InventoryFormUI = (props: InventoryProps) => {
    const [itemNames, setItemNames] = useState([{label: "Test", value:"Test"}]);
    const [selectedValue, setSelectedValue] = useState("")

    const [expiryDate, setExpiryDate] = useState("")
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };

    const onChangePicker = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate);

            if (Platform.OS === 'android') {
                toggleDatePicker();
                setExpiryDate(currentDate.toDateString());
            }
        }
        else {
            toggleDatePicker();
        }
    };
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
                      <View style={styles.pickerStyle}>
                      <Picker
                        style={styles.picker}
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
                      </View>
                       <TextInput
                            style={{...styles.inputQty, height:60, marginTop: 40, width: 50}}
    //                             onChangeText={onChangeNumber}
    //                             value={number}
                            placeholder="Qty"
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                {/*Expiry Date and Time*/}
                <Text style={[styles.lightText, styles.normalText, styles.marginSpecial]}>Enter expiry date and time:</Text>
                <View style={styles.marginSmaller}>
                    <View style={styles.inputItem}>
                        {showPicker && (
                            <DateTimePicker
                                mode= "date"
                                display= "spinner"
                                value= {date}
                                onChange= {onChangePicker}

                            />
                        )}
                        {!showPicker && (
                            <Pressable
                                onPress= {toggleDatePicker}
                            >
                                <TextInput
                                    style={styles.normalInput}
                                    placeholder="Sat Nov 11 2023"
                                    value= {expiryDate}
                                    onChangeText= {setExpiryDate}
                                    placeholderTextColor="#11182744"
                                    editable= {false}
                                />
                            </Pressable>
                        )}
                    </View>
                </View>
                {/*Password*/}
                <Text style={[styles.lightText, styles.normalText, styles.marginLarger]}>Enter password:</Text>
                <View style={styles.listStyle, styles.marginSmaller}>
                    <View style={styles.inputItem}>
                        <TextInput
                            style={styles.normalInput}
                            placeholder="Item"
                            keyboardType="numeric"
                            placeholderTextColor="#11182744"
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

export default InventoryFormUI;