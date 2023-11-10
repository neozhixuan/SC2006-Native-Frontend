import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
  TextInput
} from 'react-native';
import { styles, COLORS } from "./styles";

type InventoryProps = {
    setPage: ()=>void;
}

const ViewSuggestionsUI = (props: InventoryProps) => {
    const mockData = [
     {id: 0, name: "Big Mac", ingredient: "1x Chicken"},
     {id: 1, name: "Fillet o Fish", ingredient: "1x Fish"},
     {id: 2, name: "Chicken Nugget", ingredient: "2x Chicken"},
    ]
    // Render each item in the list
    const renderItem = ({ item }) => (
      <View style={styles.suggestionItem}>
        <Text style={styles.normalText}>{item.name}</Text>
        <Text>{item.ingredient}</Text>
      </View>
    );
    return(
            <View style={styles.mainBody}>
                   <View style={styles.container}>
                       <Text style={[styles.lightText, styles.headerText]}>View Suggestions</Text>
                      <View>
                      <View style={styles.listStyle}>
                          <FlatList
                            data={mockData}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                          />
                      </View>
                     <Pressable style={[styles.mainButton, styles.marginSmaller]} onPress={() => props.setPage(0)}>
                          <Text style={[styles.buttonText, styles.normalText]}>Return</Text>
                      </Pressable>
                      </View>
                   </View>

               </View>)
}

export default ViewSuggestionsUI;