import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView
} from 'react-native';
import { styles, COLORS } from "./styles";
import { Picker } from '@react-native-picker/picker';
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useState, useEffect } from 'react';
import moment from 'moment';
import { ItemType } from "../App.tsx";

type InventoryProps = {
  setPage: () => void;
  orders: ItemType;
};

const ViewPredictionsUI = (props: InventoryProps) => {
  const [predictions, setPredictions] = useState([]);
  const [graphData, setGraphData] = useState({ labels: [], datasets: [{ data: [] }] });
  const [lettuceGraphData, setLettuceGraphData] = useState({ labels: [], datasets: [{ data: [] }] });
  const [tomatoGraphData, setTomatoGraphData] = useState({ labels: [], datasets: [{ data: [] }] });
  const [cucumberGraphData, setCucumberGraphData] = useState({ labels: [], datasets: [{ data: [] }] });
  const [pepperGraphData, setPepperGraphData] = useState({ labels: [], datasets: [{ data: [] }] });

  const [weeksOptions, setWeeksOptions] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState("All Data");

  const ALLOWED_LABELS = ["Training Data", "Actual Sales", "Predicted Sales"];
  const produceLabels = ["Lettuce Romaine", "Tomatoes Cherry", "Cucumber Local", "Pepper / Capsicum Green"];

  // Chart configurations
  const chartConfig = {
    backgroundGradientFrom: COLORS.peach,
    backgroundGradientTo: COLORS.peach,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };

  const singleLineChartConfig = {
    backgroundGradientFrom: COLORS.peach,
    backgroundGradientTo: COLORS.peach,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };

  const screenWidth = Dimensions.get("window").width - 60;

  const fetchPredictions = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8000/api/predictions');
      const json = await response.json();
      setPredictions(json);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to generate a date range between two moments (start and end)
const generateDateRange = (start, end) => {
    const dateRange = [];
    let currentDate = start.clone();
    while (currentDate.isSameOrBefore(end)) {
        dateRange.push(currentDate.clone());
        currentDate.add(1, 'day');
    }
    return dateRange;
};

// Modify the transformDataForChart function to ensure data aligns with 1st May to 30th June
const transformDataForChart = (data, startDate) => {
  const start = moment("2023-05-01");
  const end = moment("2023-06-30");
  const fullDateRange = generateDateRange(start, end).map(date => date.format('YYYY-MM-DD'));  // Ensure the dates are in string format for easier comparison
  console.log("Full date")
  console.log(fullDateRange)
  const datasets = {
    "Training Data": {
      label: "Training Data",
      data: new Array(fullDateRange.length).fill(0),
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`
    },
    "Actual Sales": {
      label: "Actual Sales",
      data: new Array(fullDateRange.length).fill(0),
      color: (opacity = 1) => `rgba(244, 65, 134, ${opacity})`
    },
    "Predicted Sales": {
      label: "Predicted Sales",
      data: new Array(fullDateRange.length).fill(0),
      color: (opacity = 1) => `rgba(65, 134, 244, ${opacity})`
    }
  };

  console.log("Data Points Received:", data.length);

  data.forEach(point => {
    const pointDateFormatted = moment(point.x).format('YYYY-MM-DD');
    const index = fullDateRange.indexOf(pointDateFormatted);
    console.log(`Processing point: Date: ${pointDateFormatted}, Label: ${point.label}, y: ${point.y}, Index: ${index}`);
    if (index !== -1 && datasets[point.label]) {
      datasets[point.label].data[index] = point.y || 0;  // Ensuring data is set only if the label matches
    }
  });

  return { labels: fullDateRange, datasets: Object.values(datasets) };
};

const transformSingleLineData = (data, selectedWeek) => {
    const start = selectedWeek ? moment(selectedWeek) : moment("2023-05-01");
    const end = selectedWeek ? start.clone().add(6, 'days') : moment("2023-06-30");
    const fullDateRange = generateDateRange(start, end).map(date => date.format('YYYY-MM-DD'));

    console.log("Data Points to be processed:", data);
    console.log("Full Date Range for Single Line Chart:", fullDateRange);

    const dataPoints = new Array(fullDateRange.length).fill(0);

    var indexReplace = 0
    data.forEach(point => {
        const pointDateFormatted = moment(point.x).format('YYYY-MM-DD');
        var index = fullDateRange.indexOf(pointDateFormatted);
        if (index === -1) {
            index = fullDateRange.findIndex(date => moment(date).isSame(pointDateFormatted, 'day'));
        }
        console.log(`Processing single line point: Date: ${pointDateFormatted}, x: ${point.x} y: ${point.y}, Index: ${index}`);

        if (index !== -1){
            dataPoints[index] = point.y;
        }else{
            dataPoints[indexReplace] = point.y
            indexReplace += 1;
        }
    });


    console.log("Transformed Data Points for Single Line Chart:", dataPoints);

    return {
        labels: fullDateRange,
        datasets: [{
            data: dataPoints,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            strokeWidth: 2
        }]
    };
};





const initializeWeeksOptionsForAllSets = (data) => {
  // Creates week options from May 1st to June 30th
  const createFixedWeeksOptions = () => {
    const start = moment("2023-05-01");
    const end = moment("2023-06-30");
    const weeks = ["All Data"];
    let current = start.clone().day(0);  // Ensure it starts from the start of a week

    while (current.isBefore(end)) {
      weeks.push(current.format('YYYY-MM-DD'));
      current.add(7, 'days');
    }
    return weeks;
  };

  const lettuceData = data.filter(point => point.label === "Lettuce Romaine");
  const tomatoData = data.filter(point => point.label === "Tomatoes Cherry");
  const cucumberData = data.filter(point => point.label === "Cucumber Local");
  const pepperData = data.filter(point => point.label === "Pepper / Capsicum Green");

  const combinedWeeks = createFixedWeeksOptions();  // Use fixed week options
  setWeeksOptions(combinedWeeks);
  setSelectedWeek("All Data");

  setGraphData(transformDataForChart(data.filter(point => ALLOWED_LABELS.includes(point.label)), null));
  setLettuceGraphData(transformSingleLineData(lettuceData, null));
  setTomatoGraphData(transformSingleLineData(tomatoData, null));
  setCucumberGraphData(transformSingleLineData(cucumberData, null));
  setPepperGraphData(transformSingleLineData(pepperData, null));
};

const adjustTimeframe = (selectedWeek) => {
  setSelectedWeek(selectedWeek);

  fetch('http://10.0.2.2:8000/api/graph-points/')
    .then(response => response.json())
    .then(data => {
        console.log("Full dataset from API:", data);
      const filteredData = data.filter(point => ALLOWED_LABELS.includes(point.label));
        const timeframeFilter = (dataset, week) => {
          if (week === "All Data") {
            return dataset;
          } else {
            const weekStart = moment(week).startOf('isoWeek');
            const weekEnd = weekStart.clone().endOf('isoWeek');
            return dataset.filter(point => {
              const pointDate = moment(point.x);
              return pointDate.isSameOrAfter(weekStart) && pointDate.isSameOrBefore(weekEnd);
            });
          }
        };

      setGraphData(transformDataForChart(timeframeFilter(filteredData, selectedWeek)));

      // Call transform and set state functions directly
      const lettuceData = timeframeFilter(data.filter(point => point.label === "Lettuce Romaine"), selectedWeek);
      setLettuceGraphData(transformSingleLineData(lettuceData, selectedWeek));

      const tomatoData = timeframeFilter(data.filter(point => point.label === "Tomatoes Cherry"), selectedWeek);
      setTomatoGraphData(transformSingleLineData(tomatoData, selectedWeek));

      const cucumberData = timeframeFilter(data.filter(point => point.label === "Cucumber Local"), selectedWeek);
      setCucumberGraphData(transformSingleLineData(cucumberData, selectedWeek));

      const pepperData = timeframeFilter(data.filter(point => point.label === "Pepper / Capsicum Green"), selectedWeek);
      setPepperGraphData(transformSingleLineData(pepperData, selectedWeek));
    })
    .catch(console.error);
};





  const fetchGraphData = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8000/api/graph-points/');
      const json = await response.json();
      initializeWeeksOptionsForAllSets(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPredictions();
    fetchGraphData();
    console.log(lettuceGraphData)
  }, []);

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
          {graphData.labels.length > 0 && <LineChart
            data={graphData}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            bezier
          />}
          <Text style={[styles.lightText, styles.marginSmaller]}>Lettuce Romaine</Text>
          {lettuceGraphData.labels.length > 0 && <LineChart
            data={lettuceGraphData}
            width={screenWidth}
            height={220}
            chartConfig={singleLineChartConfig}
            bezier
          />}
          <Text style={[styles.lightText, styles.marginSmaller]}>Tomatoes Cherry</Text>
          {tomatoGraphData.labels.length > 0 && <LineChart
            data={tomatoGraphData}
            width={screenWidth}
            height={220}
            chartConfig={singleLineChartConfig}
            bezier
          />}
          <Text style={[styles.lightText, styles.marginSmaller]}>Cucumber Local</Text>
          {cucumberGraphData.labels.length > 0 && <LineChart
            data={cucumberGraphData}
            width={screenWidth}
            height={220}
            chartConfig={singleLineChartConfig}
            bezier
          />}
          <Text style={[styles.lightText, styles.marginSmaller]}>Pepper / Capsicum Green</Text>
          {pepperGraphData.labels.length > 0 && <LineChart
            data={pepperGraphData}
            width={screenWidth}
            height={220}
            chartConfig={singleLineChartConfig}
            bezier
          />}
        </View>
        <Pressable style={[styles.mainButton, styles.marginSmaller]} onPress={() => props.setPage(0)}>
          <Text style={[styles.buttonText, styles.normalText]}>Return</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ViewPredictionsUI;
