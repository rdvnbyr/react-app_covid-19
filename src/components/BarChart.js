import React from 'react';
import CanvasJSReact from '../assets/canvasjs.react';

function BarChart({ ...country }) {

    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        title: {
            text: country.name
        },
        data: [{
            type: "column",
            indexLabelFontColor: "#5a5757",
            indexLabelPlacement: "outside",
            dataPoints: [
                { label: "Confirmed", y: country.chartData[0], color: '#3282b8'},
                { label: "Recovered", y: country.chartData[1], color: '#9dc6a7'},
                { label: "Deaths", y: country.chartData[2], color: '#d7385e'}
            ]
        }]
    }

    return (
        <div className="my-5 p-1 shadow">
            <CanvasJSChart options = {options} />

            <p className="text-left" style={{margin: '10px', fontSize: '12px'}}>Last Update: <span style={{fontSize: '18px'}}>{ new Date(country.chartData[3]).toLocaleString() }</span></p>

            <p className="text-left" style={{margin: '10px', fontSize: '12px'}}>Deaths/Confirmed Rate:<span style={{fontSize: '18px', color:'#4d4c7d'}}> { ((country.chartData[2]/country.chartData[0])*100).toFixed(2) }%</span></p>

            <p className="text-left" style={{margin: '10px', fontSize: '12px'}}>Confirmed: <span style={{fontSize: '18px', color: '#3282b8'}}>{ country.chartData[0] }</span></p>

            <p className="text-left" style={{margin: '10px', fontSize: '12px'}}>Recovered: <span style={{fontSize: '18px', color: '#9dc6a7'}}>{ country.chartData[1] }</span></p>

            <p className="text-left" style={{margin: '10px', fontSize: '12px'}}>Deaths: <span style={{fontSize: '18px', color:'#d7385e'}}>{ country.chartData[2] }</span></p>

        </div>
    )
}

export default BarChart;
