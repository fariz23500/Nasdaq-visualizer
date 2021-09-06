import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { utcDay } from "d3-time";
import { fitWidth } from "react-stockcharts/lib/helper";
import { timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import PropTypes from "prop-types";
import { scaleTime } from "d3-scale";

function App()
{ const [startDate, setStartDate] = useState(new Date("2021/01/01"));
const [endDate, setEndDate] = useState(new Date("2021/08/20"));
const[symbol,setSymbol]=useState("");
const[data,setData]=useState([]);
    function DatePick() {
       
        return (
          <div className="datepicker">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
    
          </div>
        );
      };
function handleClick(e)
{
    const start= startDate.getFullYear().toString()+'-'+ (startDate.getMonth()+1>=10?(startDate.getMonth()+1).toString():('0'+(startDate.getMonth()+1).toString())) +'-'+(startDate.getDate()>=10?(startDate.getDate()).toString():('0'+(startDate.getDate()).toString()));
    const end=  endDate.getFullYear().toString()+'-'+ (endDate.getMonth()+1>=10?(endDate.getMonth()+1).toString():('0'+(endDate.getMonth()+1).toString())) +'-'+(endDate.getDate()>=10?(endDate.getDate()).toString():('0'+(endDate.getDate()).toString()));
    // console.log(end);
    const a={symbol:symbol,start:start,end:end};
    
    fetch("https://stocks-fariz.herokuapp.com/",{method:'POST', headers: {"Content-Type": "application/json"},body:JSON.stringify(a)})
    .then(function(response){
       return response.json();
    }).then(function(datas){
      setData(datas);
    //   console.log(datas);
    });
    
    e.preventDefault();
}


let ChartJS = (props) => {
    data.forEach((d)=>{
        
        d.date=new Date(d.date);
    });
    console.log(data);
    const { type, width, ratio } = props;
    const data1 = data;
    const xAccessor = (d) => {
      if(d)
      {
          return d.date;}
    };
    return (
      <div className="ChartJS">
        <ChartCanvas
          height={400}
          ratio={ratio}
          width={width}
          margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
          type={type}
          data={data1}
          seriesName="MSFT"
          xAccessor={xAccessor}
          xScale={scaleTime()}
          xExtents={[new Date(2021, 0, 4), new Date(2021, 1, 10)]}
        >
          <Chart id={1} yExtents={(d) => [d.high, d.low]}>
            <XAxis axisAt="bottom" orient="bottom" ticks={6} />
            <YAxis axisAt="left" orient="left" ticks={5} />
            <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
          </Chart>
        </ChartCanvas>
      </div>
    );
  };
  
  ChartJS.prototype = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
  };
  
  ChartJS.defaultProps = {
    type: "svg",
  };
  
  ChartJS = fitWidth(ChartJS);

   function CreateChart() {
    const [chartsToDisplay, setChartsToDisplay] = useState([]);
  
    const getData = async () => {
      const charts = [];
      charts.push(<ChartJS key={1} data={data} />);
      setChartsToDisplay(charts);
    };
  
    useEffect(() => {
      getData();
    }, []);
  
    return <div className="App">{chartsToDisplay}</div>;
  };
  
function Description(props)
{
    const [data2,setData2]=useState({});
    let str="https://cloud.iexapis.com/stable/stock/"+props.symb+"/company?token=pk_83b319dbd5f8410f8939ed90ce28924d";
    
    fetch(str)
    .then(function(response){
       return response.json();
    }).then(function(datas){
      setData2(datas);
    //   console.log(datas);
    });
    return <div className="description">
    <h2>Description</h2>
        {data2.description}
    </div>
}


    return <div>
 <NavBar/>
   <div className="symbol"> <input type="text" value={symbol} onChange={(e)=>setSymbol(e.target.value)} className="form-control form-control-lg symbol-input" placeholder="enter symbol" /> </div> 
   
    <DatePick  />
    <button type="button" type="submit" onClick={handleClick} className="btn btn-primary enter-btn">Enter</button>
    {data.length!=0?<CreateChart/>:<p></p> }
    {data.length!=0?<Description symb={symbol}/>:<p></p> }
    <footer className="foot"> </footer>
        </div>
}
export default App;