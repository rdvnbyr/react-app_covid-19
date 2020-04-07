import React, { Component } from 'react';
import PieChart from './PieChart';
import axios from 'axios';
import DailyChart from './DailyChart';
import { Button } from 'react-bootstrap'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmed: 0,
            recovered: 0,
            deaths: 0,
            lastUpdate: '',
            isDaily: false,
            totalConfirmed: [],
            totalDeaths: []
        }
    }

    componentDidMount() {

        const getData = () => {
            axios
                .get("https://covid19.mathdro.id/api")
                .then( res => res.data )
                .then( data => {
                                    // console.log(data);
                                    this.setState({
                                        confirmed: data.confirmed.value,
                                        recovered: data.recovered.value,
                                        deaths: data.deaths.value,
                                        lastUpdate: data.lastUpdate
                                    })
                                }
                )
        }
        getData();

        this.interval = setInterval( () => {
            console.log('setInterval worked');
            getData();

        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    dailyChartHandler = () => {
        this.setState({
            isDaily: !this.state.isDaily
        })
    }

    componentDidUpdate() {

        if ( this.state.isDaily === true && this.state.totalConfirmed.length === 0 && this.state.totalDeaths.length === 0 ) {
            axios
            .get("https://covid19.mathdro.id/api/daily")
            .then( res => res.data)
            .then( data => {
                console.log(data);
                let totalConfirmed = data.map( item => {
                    return {
                        x: new Date(item.reportDate),
                        y: item.totalConfirmed
                    }
                } );
                let totalDeaths = data.map( item => {
                    return {
                        x: new Date(item.reportDate),
                        y: item.deaths.total
                    }
                });
                this.setState({
                    totalConfirmed,
                    totalDeaths
                })
            })
        } else {
            return null;
        }
    }


    render() {

        const { confirmed, recovered, deaths, lastUpdate, isDaily, totalConfirmed, totalDeaths } = this.state;

        let chartData = [
            { y: confirmed, label: 'confirmed'},
            { y: recovered, label: 'recovered'},
            { y: deaths, label: 'deaths'}
        ]

        return (
            <div className="container mt-2 text-center">
                <PieChart 
                    title=' Covid-19 Last Uptade of the World '
                    date={ new Date(lastUpdate).toLocaleString() }
                    chartData={ chartData }
                />

                <h3 className="text-center text-danger mt-4">Click for the Daily Report</h3>
                <Button className="my-3 mx-auto" variant="outline-danger" onClick={this.dailyChartHandler}>Click me</Button>

                <div>
                    {
                        isDaily ? <DailyChart title="Daily Update" totalConfirmed={totalConfirmed} totalDeaths={totalDeaths} /> : null
                    }
                </div>

                <div className="d-flex row">
                    <div className="col-6">
                        {
                            isDaily ? <DailyChart title="Total Confirmed" totalConfirmed={totalConfirmed} /> : null
                        }
                    </div>

                    <div className="col-6">
                        {
                            isDaily ? <DailyChart title="Total Deaths" totalDeaths={totalDeaths} /> : null
                        }
                    </div>

                </div>  
            </div>
        )
    }
}

export default Home
