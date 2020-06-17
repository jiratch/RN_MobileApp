// https://github.com/indiespirit/react-native-chart-kit/issues/35
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {
  LineChart,
} from 'react-native-chart-kit'
import StockButton from './StockButton.js';
import API from './api.js';
import AppSwitch from './Switch.js';


const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`, // color of background
  strokeWidth: 2 // optional, default 3
}

export default class Stocks extends Component {

  constructor(props) {
    super(props);
    this.changeIndex = this.changeIndex.bind(this);
    this.state = {
      dates: ["01-01", "01-02", "01-03", "01-04", "01-05", "01-06", "01-07"],
      prices: [1, 2, 3, 4, 5, 6, 7],
      Stock_Name: '',
      Stock_Code: '',
      Series: '',
      Type:'',
      sw:'',
      status:true
  
    }
  }


  changeIndex(stockCode, stockName, sw) {
    console.log("-------------");
    console.log(stockName);
    
    this.setState({
      Stock_Name: stockName,
      Stock_Code: stockCode,
      status: sw,
      Series: sw ? 'DAILY':'WEEKLY',
      Type:   sw ? 'Time Series (Daily)':'Weekly Time Series'


    }, () => {
      //console.log('status ='+this.state.status)

      console.log(this.state.Series)
      let closingPrice = [];
      let labels = [];
      API(stockCode, this.state.Series).then((stock) => {
        let datesArray = Object.keys(stock[this.state.Type]).slice(0, 7);

        datesArray.forEach((day) => {
          closingPrice.push(parseFloat(stock[this.state.Type][day]["4. close"]));
          labels.push(day.slice(5, 10));
        })

        labels.reverse();
        closingPrice.reverse();

        this.setState({
          dates: labels,
          prices: closingPrice
        });
      });

    });
    /*  let closingPrice = [];
     let labels = [];
     API(stockCode, this.state.Series).then((stock) => {
       let datesArray = Object.keys(stock["Time Series (Daily)"]).slice(0, 7);
 
       datesArray.forEach((day) => {
         closingPrice.push(parseFloat(stock["Time Series (Daily)"][day]["4. close"]));
         labels.push(day.slice(5, 10));
       })
 
       labels.reverse();
       closingPrice.reverse();
 
       this.setState({
         dates: labels,
         prices: closingPrice
       });
     }); */
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>{this.state.Stock_Name}</Text>
          <LineChart
            data={{
              labels: this.state.dates,
              datasets: [{
                data: this.state.prices,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                strokeWidth: 2 // optional
              }]
            }}
            width={Dimensions.get('window').width}
            height={220}
            yAxisLabel={'$'}
            chartConfig={chartConfig}
            style={{ paddingVertical: 10 }}
          />
        </View>

        <View style={styles.footer}>
          <StockButton  series={this.state.status} code='AAPL' name='Apple' onPress={this.changeIndex}   />
          <StockButton  series={this.state.status} code='GOOGL' name='Google' onPress={this.changeIndex}    />
          <StockButton  series={this.state.status} code='UBER' name='Uber' onPress={this.changeIndex}   />

        </View>
        <AppSwitch code={this.state.Stock_Code} name={this.state.Stock_Name} onPress={this.changeIndex} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow'
  },

  footer: {
    flex: 0.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    backgroundColor: 'pink'
  },
  button: {
    margin: 10,
    borderWidth: 1,
    width: 100,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray'
  }
});
