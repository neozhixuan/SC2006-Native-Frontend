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
import { Picker } from '@react-native-picker/picker';

// Chart Library //
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width - 60;
import {
  LineChart
} from "react-native-chart-kit";
///////////////////

import { useState, useEffect } from 'react';
import moment from 'moment'; // Adding moment.js to handle date manipulation
import { ItemType } from "../App.tsx";

type InventoryProps = {
  setPage: () => void;
  orders: ItemType;
};

const ViewPredictionsUI = (props: InventoryProps) => {
  const [predictions, setPredictions] = useState([
    { id: 0, item_name: "Burger Bun", quantity: 45 },
    { id: 1, item_name: "Fish Patty", quantity: 40 },
    { id: 2, item_name: "Cheese Slice", quantity: 35 },
    { id: 3, item_name: "Egg", quantity: 80 },
    { id: 4, item_name: "Potato Fries", quantity: 150 }
  ]);

  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [{ data: [] }]
  });

  const [timeframe, setTimeframe] = useState("1 week");
  const [weeksOptions, setWeeksOptions] = useState([]); // All available weeks for selection
  const [selectedWeek, setSelectedWeek] = useState(""); // Currently selected week

  const fetchPredictions = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8000/api/predictions');
      const json = await response.json();
      setPredictions(json);
      return json;
    } catch (error) {
      console.error(error);
    }
  };

    const organizeDataByLabel = (data) => {
      const colorMap = {
        'Training Data': 'rgba(134, 65, 244, 1)',
        'Actual Sales': 'rgba(244, 65, 134, 1)',
        'Predicted Sales': 'rgba(65, 134, 244, 1)',
        // Add more label-to-color mappings here if needed
      };

      const datasets = {};
      data.forEach(point => {
        if (!datasets[point.label]) {
          datasets[point.label] = {
            label: point.label,
            data: [],
            color: (opacity = 1) => `${colorMap[point.label]}`,
          };
        }
        datasets[point.label].data.push(point.y);
      });

      return datasets;
    };

const transformDataForChart = (data) => {
  // Universal start date and end date for all datasets
  const startDate = moment("2023-01-01");
  const endDate = moment("2023-06-30");

  // Function to generate a full date range from start to end date
  const generateDateRange = (startDate, endDate) => {
    const dateRange = [];
    let currentDate = startDate.clone();
    while (currentDate <= endDate) {
      dateRange.push(currentDate.format('YYYY-MM-DD'));
      currentDate.add(1, 'day');
    }
    return dateRange;
  };

  const fullDateRange = generateDateRange(startDate, endDate);

  // Initialization of datasets with null values to ensure all are the same length
  const datasets = {
    "Training Data": {
      label: "Training Data",
      data: new Array(fullDateRange.length).fill(null),
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`
    },
    "Actual Sales": {
      label: "Actual Sales",
      data: new Array(fullDateRange.length).fill(null),
      color: (opacity = 1) => `rgba(244, 65, 134, ${opacity})`
    },
    "Predicted Sales": {
      label: "Predicted Sales",
      data: new Array(fullDateRange.length).fill(null),
      color: (opacity = 1) => `rgba(65, 134, 244, ${opacity})`
    }
  };

  // Fill in actual data points for each dataset starting from their respective start points
  data.forEach(point => {
    const dataset = datasets[point.label];
    if (dataset) {
      const index = fullDateRange.indexOf(moment(point.x).format('YYYY-MM-DD'));
      if (index !== -1) {
        dataset.data[index] = point.y; // Assign y-values starting from the respective start dates
      }
    }
  });

  return {
    labels: fullDateRange,
    datasets: Object.values(datasets)
  };
};



  const fetchGraphData = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8000/api/graph-points/');
      const json = await response.json();
      // Initialize the weeks selection based on the data
      initializeWeeksOptions(json);
    } catch (error) {
      console.error(error);
    }
  };

const initializeWeeksOptions = (data) => {
  const firstDate = moment.min(data.map(point => moment(point.x)));
  const lastDate = moment.max(data.map(point => moment(point.x)));

  const weeks = ["All Data"]; // Add "All Data" option here
  let current = firstDate.clone().day(0);
  while (current.isBefore(lastDate)) {
    weeks.push(current.format('YYYY-MM-DD'));
    current = current.clone().add(7, 'days');
  }

  setWeeksOptions(weeks);
  setSelectedWeek("All Data"); // Set initial state to "All Data"

  // Load all data initially
  setGraphData(transformDataForChart(data, null));
};

const adjustTimeframe = (selectedWeek) => {
  setSelectedWeek(selectedWeek);

  fetch('http://10.0.2.2:8000/api/graph-points/')
    .then(response => response.json())
    .then(data => {
      if (selectedWeek === "All Data") {
        // If "All Data" is selected, return all data without filtering
        setGraphData(transformDataForChart(data, null));
      } else {
        // Filter based on the selected start date
        const startDate = moment(selectedWeek);
        setGraphData(transformDataForChart(data, startDate));
      }
    })
    .catch(console.error);
};


  useEffect(() => {
    fetchPredictions();
    fetchGraphData();
  }, []);

  let uniqueNames = [];

  const chartConfig = {
    backgroundGradientFrom: COLORS.peach,
    backgroundGradientTo: COLORS.peach,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };

  return (
    <ScrollView style={styles.mainBody}>
      <View style={styles.container}>
        <Text style={[styles.lightText, styles.headerText]}>Analytics</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[styles.lightText, styles.normalText, styles.marginSmaller]}>Data over {selectedWeek === "All Data" ? `1 month` : `1 week`}</Text>
          <Picker
            style={{ width: 150, backgroundColor: COLORS.light, height: 20 }}
            selectedValue={selectedWeek}
            onValueChange={adjustTimeframe}
          >
            {weeksOptions.map((item, index) => (
              <Picker.Item label={`Week starting ${item}`} value={item} key={index} />
            ))}
          </Picker>
        </View>
        <View>
          {(graphData.labels).length > 0 && <LineChart
                                              data={graphData}
                                              width={screenWidth}
                                              height={220}
                                              chartConfig={chartConfig}
                                              withHorizontalLabels={true}
                                              withVerticalLabels={true}
                                              yAxisInterval={1} // Optional: Adjust based on data density
                                              fromZero={false} // Optional: Start Y-axis from zero or data's min value
                                              onDataPointClick={(data) => console.log(data)} // For debugging: log data point on click
                                              bezier // Optional: Smooth lines
                                            />
}
        </View>
        </View>
                  <Pressable style={[styles.mainButton, styles.marginSmaller]} onPress={() => props.setPage(0)}>
                    <Text style={[styles.buttonText, styles.normalText]}>Return</Text>
                  </Pressable>
    </ScrollView>
  );
};

export default ViewPredictionsUI;
