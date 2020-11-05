import React from 'react';
import MapGL from 'react-map-gl';
import MapKey from "../../env" ;
import { Grid, GridItem } from 'nr1';


// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

const tableGridStyle = {
    backgroundColor: "#fff",
    padding: "20px",
}
export default class MyTestNerdpackNerdletNerdlet extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            viewport: {
                height: "100vh",
                width: "100%",
                latitude: 37.7577,
                longitude: -122.4376,
                zoom: 8
            }
        }
    }
    render() {
        const {viewport} = this.state;

        return(
        <Grid>
             <GridItem columnSpan={6}>
        <MapGL
            mapboxApiAccessToken={MapKey}
            {...viewport}
        /></GridItem>
        <GridItem columnSpan={6} style={tableGridStyle}>
            Hello World!

        </GridItem>

        
        </Grid>
         )
    }
}
