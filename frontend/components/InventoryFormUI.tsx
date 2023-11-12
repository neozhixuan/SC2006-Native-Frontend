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
import { useEffect, useState, useCallback } from 'react';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles, COLORS } from "./styles";
import { useForm, Controller } from 'react-hook-form';

type InventoryProps = {
    setPage: ()=>void;
}

const emptyItem = {
	"name": "",
	"qty": null,
};

const InventoryFormUI = (props: InventoryProps) => {
    // Dropdown Values
    const [itemNames, setItemNames] = useState([{label: "Test", value:"Test"}]);
    // List of Items inputted in form
    const [items, setItems] = useState([{"name": "", "qty": null}])
    // Date Time Picker formatting
    const [expiryDate, setExpiryDate] = useState("")
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();

    // Date Time Picker logic
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

    // Item List Handler
	const handleAddItem = useCallback(() => {
		const a = [...items, emptyItem];
		setItems(a);
	}, [items, setItems]);

    const handleUpdateItem = useCallback(
        (type, index, value) => {
            const _items = [...items];
            const _item = { ..._items[index] };
            _item[type] = value;
            _items[index] = _item;
            setItems(_items);
        },
        [items, setItems],
    );

	const handleRemoveItem = useCallback((index) => {
        const _items = [...items];
        _items.splice(index, 1);
        setItems(_items);
    }, [items, setItems]);

    // Fetching list of names for dropdown, from backend
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

    // Render on component mount
    useEffect(()=>{
        fetchItemNames();
    }, [])

    // Submit Handler
    const onSubmitHandler = () => {
        console.log(items)
    }

    // Submit Form Logic
    const onSubmitForm = (formData, itemName) => {
        postData = {"ItemName": itemName, "Price": formData.expiryDate, "Description": formData.password};
        console.log(`Attempting to submit ${itemName} to backend with expiryDate of ${formData.expiryDate} and password: ${formData.password}`);

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
                console.log(` ${itemName} submitted to backend with expiryDate of ${formData.expiryDate} and password: ${formData.password}`);
            })
            .catch(error => {
                // Handle errors
                console.error('Error sending POST request:', error);
            });
    };

    return(
        <View style={styles.mainBody}>
            <View style={styles.container}>
                <Text style={[styles.lightText, styles.headerText]}>Inventory Form (New Shipment)</Text>
                {/*Shipping Details*/}
                <Text style={[styles.lightText, styles.normalText]}>Enter shipment details*:</Text>
                <View style={{...styles.listStyle, ...styles.marginSmaller, gap: 65}}>
                    {items.map((item, idx) => (
                      <View style={styles.inputItem} key={idx}>
                        <View style={styles.pickerStyle}>
                          <Picker
                              style={styles.picker}
                              selectedValue={item.name}
                              onValueChange={(itemValue, itemIndex) => {
                                handleUpdateItem("name", idx, itemValue)
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
                          placeholder="Qty"
                          keyboardType="numeric"
                          onChangeText={(text) => handleUpdateItem("qty", idx, text)}
                        />
                        {idx === 0 ? (
                        <Pressable style={{...styles.inputQty, height:60, marginTop: 40, width: 50}} onPress={handleAddItem}>
                          <Text>+</Text>
                        </Pressable>) : (
                        <Pressable style={{...styles.inputQty, height:60, marginTop: 40, width: 50}} onPress={() => handleRemoveItem(idx)}>
                          <Text>-</Text>
                        </Pressable>)}
                      </View>
                    ))}
                </View>
                {/*Expiry Date and Time*/}
                <Controller
                    key={"ExpiryDate"}
                    control={control}
                    render={({ field }) => (
                        <View>
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
                            {errors["ExpiryDate"] && <Text style={[styles.marginSmaller]}>{errors["ExpiryDate"].message}</Text>}
                        </View>
                    )}
                    name={"ExpiryDate"}
                    rules={{ required: `ExpiryDate is required` }}
                />
                {/*Password*/}
                <Controller
                    key={"Password"}
                    control={control}
                    render={({ field }) => (
                        <View>
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
                            {errors["Password"] && <Text style={[styles.marginSmaller]}>{errors["Password"].message}</Text>}
                        </View>
                    )}
                    name={"Password"}
                    rules={{ required: `Password is required` }}
                />
                {/* Rows of buttons */}
                <View style={styles.marginLarger}>
                   <Pressable style={styles.mainButton} onPress={handleSubmit((formData) => onSubmitForm(formData, item.name))}>
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