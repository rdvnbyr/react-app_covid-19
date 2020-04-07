import React, { Component } from 'react';
import axios from 'axios';
import BarChart from './BarChart';
import {  CardGroup } from 'react-bootstrap';


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            usa: [],
            china:[],
            italy: [],
            germany: [],
            turkey: [],
            selectedCountry: '',
            other: { country: '', name: '', chartData: [] }

        }
    }

    componentDidMount() {
        axios
            .all([
                axios.get("https://covid19.mathdro.id/api/countries"),
                axios.get("https://covid19.mathdro.id/api/countries/USA"),
                axios.get("https://covid19.mathdro.id/api/countries/CHN"),
                axios.get("https://covid19.mathdro.id/api/countries/ITA"),
                axios.get("https://covid19.mathdro.id/api/countries/DEU"),
                axios.get("https://covid19.mathdro.id/api/countries/TUR") 
            ])
            .then( axios.spread( ( countryList, usa, china, italy, germany, turkey ) => {

                this.setState({
                    countries: countryList.data.countries.map( item => [ item.name, item.iso3 ] ),
                    usa:    [ 
                                usa.data.confirmed.value,
                                usa.data.recovered.value,
                                usa.data.deaths.value,
                                usa.data.lastUpdate         
                            ],
                    china:  [ 
                                china.data.confirmed.value,
                                china.data.recovered.value,
                                china.data.deaths.value,
                                china.data.lastUpdate                 
                            ],
                    italy:  [ 
                                italy.data.confirmed.value,
                                italy.data.recovered.value,
                                italy.data.deaths.value,
                                italy.data.lastUpdate
                            ],
                    germany:[ 
                                germany.data.confirmed.value,
                                germany.data.recovered.value,
                                germany.data.deaths.value,
                                germany.data.lastUpdate                    
                            ],
                    turkey: [ 
                                turkey.data.confirmed.value,
                                turkey.data.recovered.value,
                                turkey.data.deaths.value,
                                turkey.data.lastUpdate       
                            ],
                    other: { country: this.state.selectedCountry }
                }, () => console.log(this.state) )
                
            }))

    }

    componentDidUpdate() {
        if ( this.state.selectedCountry !== this.state.other.country ) {
            const short = this.state.selectedCountry.slice( this.state.selectedCountry.length - 3 );
            axios   
                .get(`https://covid19.mathdro.id/api/countries/${short}`)
                .then( res => res.data )
                .then( data => {

                    console.log(data);
                    const chartData = [
                        data.confirmed.value,
                        data.recovered.value,
                        data.deaths.value,
                        data.lastUpdate
                    ];

                    const name = this.state.selectedCountry.split(',')[0];
                    const country = this.state.selectedCountry;

                    this.setState({
                        other: {
                            country,
                            name,
                            chartData
                        }
                    })

                })
        }
    }


    render() {

        const { usa, china, italy, germany, turkey, countries, other } = this.state;
        const barChartCountries =   [
                                        { name: 'USA', chartData: usa },
                                        { name: 'CHINA', chartData: china },
                                        { name: 'ITALY', chartData: italy },
                                        { name: 'GERMANY', chartData: germany },
                                        { name: 'TURKEY', chartData: turkey },
                                    ]

        return (
            <div className="container-fluid">
                <CardGroup>
                {
                    barChartCountries.map( ( item, index ) => 

                        <div key={index} style={{width: '20%'}}> 
                            <div style={{margin: '20px'}}> 
                                <BarChart  { ...item }/> 
                            </div> 
                        </div> 
                    )
                }
                </CardGroup>
                <hr/>
                <div className="container my-4">
                    <div>Select a Country</div>
                    <select style={{height: '40px'}} className="p-3" onChange={ ev => this.setState({selectedCountry: ev.target.value})}>
                        {
                            countries.map( (item, index) => 
                                                            <option key={index}>
                                                                { item[0] + ' , ' + item[1] }
                                                            </option>
                            )
                        }
                    </select>
                    {
                        other.country ? <div className="px-3 mb-3"> <BarChart { ...other }/> </div> : null
                    }
                </div>

            </div>
        )
    }

}

export default Search;
