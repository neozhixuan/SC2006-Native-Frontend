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

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Empty');

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'android');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
        setText(fDate + '\n' + fTime);

        console.log(fDate + '(' + fTime + ')');
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

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
                            style={styles.inputQty}
    //                             onChangeText={onChangeNumber}
    //                             value={number}
                            placeholder="Qty"
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                {/*Current Date and Time*/}
                <Text style={[styles.lightText, styles.normalText, styles.marginSpecial]}>Enter current date and time:</Text>
                <View style={styles.listStyle, styles.marginSmaller}>
                    <View style={styles.inputItem}>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>{text}</Text>
                        <View style = {styles.buttonStyle}>
                        <Button
                            title= 'Date'
                            onPress= {() => showMode('date')}
                        />
                        </View>
                        <View style = {styles.buttonStyle}>
                        <Button
                            title= 'Time'
                            onPress= {() => showMode('time')}
                        />
                        </View>

                        {show && (
                            <DateTimePicker
                            testID='dateTimePicker'
                            value= {date}
                            mode= {mode}
                            is24Hour= {true}
                            display= 'default'
                            onChange= {onChangeDate}
                        />)}
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

export default InventoryFormUI;