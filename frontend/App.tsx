import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
//   ScrollView,
//   StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Pressable,
  Alert
} from 'react-native';

import Navbar from "./components/Navbar"

import {
  Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const COLORS = {
light: '#FBF5E6',
peach: '#C6847C',
buttonColor: '#EBCABC'
}

function App(): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

  const mockData = [
    {name: "Apple", quantity: 10},
    {name: "Orange", quantity: 10},
    {name: "Guava", quantity: 15},

  ]

  // Render each item in the list
  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.normalText}>{item.name}</Text>
      <Text style={styles.normalText}>{item.quantity}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.backgroundStyle}>
        <Navbar/>
        <View style={styles.mainBody}>
            <View style={styles.container}>
                <Text style={[styles.lightText, styles.headerText]}>Inventory</Text>
                <View style={styles.listStyle}>
                    <FlatList
                      data={mockData}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.id}
                    />
                </View>

                <View style={styles.buttonSection}>
                    <Pressable style={styles.mainButton} onPress={() => Alert.alert('Simple Button pressed')}>
                        <Text style={[styles.buttonText, styles.normalText]}>Fill in Inventory Form</Text>
                    </Pressable>
                    <Pressable style={styles.mainButton} onPress={() => Alert.alert('Simple Button pressed')}>
                        <Text style={[styles.buttonText, styles.normalText]}>Fill in Manual Form</Text>
                    </Pressable>
                    <Pressable style={styles.mainButton} onPress={() => Alert.alert('Simple Button pressed')}>
                        <Text style={[styles.buttonText, styles.normalText]}>View Daily Suggestions</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    backgroundStyle:{
        backgroundColor: '#C6847C'
    },
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
    }
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
