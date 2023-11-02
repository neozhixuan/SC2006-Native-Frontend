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


function App(): JSX.Element {

  const [page, setPage] = useState(0)

  return (
    <SafeAreaView style={styles.backgroundStyle}>
        <Navbar/>
        {page === 0 && <ViewInventoryUI setPage={setPage}/>}
        {page === 1 && <InventoryFormUI setPage={setPage}/>}
        {page === 2 && <ViewPredictionsUI setPage={setPage}/>}
        {page === 3 && <ViewSuggestionsUI setPage={setPage}/>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    backgroundStyle:{
        backgroundColor: '#C6847C'
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
