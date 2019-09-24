import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chart from '../components/Chart';

const hex = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e']

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  }
}));

const convert = (quotes) => {
  let all = [];
  quotes.forEach((quote, index) => {
    let data = [];
    let size = quote.prices.length - 1;
    quote.prices.forEach((price, priceIndex) => {
      if(size <= 10 || size - priceIndex <= 10) {
        let chartData = {};
        chartData["time"] = priceIndex + "s";
        chartData[quote.symbol] = price;
        data.push(chartData);
      }
    })
    all.push({
      symbol: quote.symbol,
      data
    });
  })
  return all;
}

const randomColor = () => {
  let color = '';
  for(let i = 0; i < 6; i++) {
    let rn = Math.floor(Math.random() * hex.length);
    color += hex[rn];
  }
  return color;
}

const Render = ({ quotes }) => {
  const classes = useStyles();
  if(quotes.length) {
    let chartData = convert(quotes);
    let chartRender = chartData.map((data, index) => {
      return <Chart symbol={data.symbol} data={data.data} color={randomColor()} />;
    })
    return (
      <div className='chart-container'>
        {chartRender}
      </div>
    );
  } else {
    return (
      <CircularProgress className={classes.progress} />
    );
  }
}

export default Render;