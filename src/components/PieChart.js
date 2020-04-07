import React from 'react';
import CanvasJSReact from '../assets/canvasjs.react';

 
function PieChart(props) {

    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    
    const { title, date, chartData } = props;
	
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark2",
        title:{
            text: ""
        },
        data: [{
            type: "pie",
            showAngle: 0,
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label}: {y}",		
            startAngle: 0,
            dataPoints: chartData
        }]
    }
		
    return (
        <div className="">
            <h2 className="text-center my-3">{ title }</h2>
            <p className="text-center mb-5">{ date }</p>
            <CanvasJSChart options = {options} 
            />
        </div>
    );
    
}
 
export default PieChart;   