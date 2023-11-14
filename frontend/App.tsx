import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Pressable,
  Alert
} from 'react-native';

import { useState, useEffect } from 'react';

import Navbar from "./components/Navbar"
import Test from "./components/Test"
import ViewInventoryUI from "./components/ViewInventoryUI"
import InventoryFormUI from "./components/InventoryFormUI"
import ViewPredictionsUI from "./components/ViewPredictionsUI"
import ViewSuggestionsUI from "./components/ViewSuggestionsUI"
import NotificationAlert from "./components/NotificationAlert"
export interface ItemType {
  id: number;
  item_name: string;
  quantity: number;
  expiry_date: string;
  flow_rate: number;
}

function App(): JSX.Element {
  const [orders, setOrders] = useState([{id: 0, item_name: "Burger Bun", quantity: 50, expiry_date: "10 March", flow_rate: 0}, {id: 1, item_name: "Burger Bun", quantity: 20, expiry_date: "12 March", flow_rate: 0}, {id: 2, item_name: "Fish Patty", quantity: 5, expiry_date: "10 March", flow_rate: 0}, {id: 3, item_name: "Cheese Slice", quantity: 30, expiry_date: "10 March", flow_rate: 0},  {id: 4, item_name: "Egg", quantity: 120, expiry_date: "10 March", flow_rate: 0}, {id: 5, item_name: "Potato Fries", quantity: 150, expiry_date: "10 March", flow_rate: 0}])
  const [lowStock, setLowStock] = useState([{id: 0, ItemName: "Fish Patty", Quantity: 5}]);
  const [suppliers, setSupplier] = useState([{id:0, Name: "Sheng Siong", ItemName: "Fish Patty", PhoneNumber: 81234567}])
  const [page, setPage] = useState(0);
  const [showNotification, setShowNotification] = useState(true);

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          'http://10.0.2.2:8000/api/inventory/',
        );
        const json = await response.json();
        setOrders(json);
        console.log(json);
        return json;a
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(()=>{
        fetchOrders();
    }, [])

    const handleFormSubmit = async () => {
        // Refresh orders by calling fetchOrders
        await fetchOrders();
    };
  return (
    <SafeAreaView style={styles.backgroundStyle}>
        {(showNotification && lowStock.length > 0) &&  (
          <NotificationAlert
            lowStock={lowStock}
            suppliers={suppliers}
            message="This is a notification message."
            onClose={()=>setShowNotification(false)}
          />
        )}
        <Navbar/>
        {page === 0 && <ViewInventoryUI setPage={setPage} orders={orders}/>}
        {page === 1 && <InventoryFormUI setPage={setPage} handleFormSubmit={handleFormSubmit}/>}
        {page === 2 && <ViewPredictionsUI setPage={setPage}  orders={orders}/>}
        {page === 3 && <ViewSuggestionsUI setPage={setPage}/>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    backgroundStyle:{
        backgroundColor: '#C6847C',
        height: '100%'
    },
});

export default App;
