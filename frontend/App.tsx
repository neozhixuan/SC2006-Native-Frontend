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

import {useState} from 'react';

import Navbar from "./components/Navbar"
import Test from "./components/Test"
import ViewInventoryUI from "./components/ViewInventoryUI"
import InventoryFormUI from "./components/InventoryFormUI"
import ViewPredictionsUI from "./components/ViewPredictionsUI"
import ViewSuggestionsUI from "./components/ViewSuggestionsUI"
import NotificationAlert from "./components/NotificationAlert"
export interface ItemType {
  id: number;
  ItemName: string;
  Quantity: number;
  ExpiryDate: string;
}

function App(): JSX.Element {
  const [orders, setOrders] = useState([{id: 0, ItemName: "Burger Bun", Quantity: 50, ExpiryDate: "10 March"}, {id: 1, ItemName: "Burger Bun", Quantity: 20, ExpiryDate: "12 March"}, {id: 2, ItemName: "Fish Patty", Quantity: 5, ExpiryDate: "10 March"}, {id: 3, ItemName: "Cheese Slice", Quantity: 30, ExpiryDate: "10 March"},  {id: 4, ItemName: "Egg", Quantity: 120, ExpiryDate: "10 March"}, {id: 5, ItemName: "Potato Fries", Quantity: 150, ExpiryDate: "10 March"}])
  const [lowStock, setLowStock] = useState([{id: 0, ItemName: "Fish Patty", Quantity: 5}]);
  const [suppliers, setSupplier] = useState([{id:0, Name: "Sheng Siong", ItemName: "Fish Patty", PhoneNumber: 81234567}])
  const [page, setPage] = useState(0);
  const [showNotification, setShowNotification] = useState(true);

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
        {page === 1 && <InventoryFormUI setPage={setPage}/>}
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

////// Code Example
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
/////////////////////

/////// Component Example
// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;
//
// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }
/////////////

/////// Style Example
// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });
/////////////

export default App;
