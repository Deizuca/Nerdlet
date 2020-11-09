import React from 'react';
import MapGL from 'react-map-gl';
import ReactMapGL, {Marker} from 'react-map-gl';
import MapKey from "../../env" ;
import { Grid, GridItem, AccountPicker, Table, TableHeader, TableHeaderCell, TableRow, TableRowCell} from 'nr1';
import { nrdbQuery } from '../../nrql-query';
import { CustomerMarker } from './marker';



// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

const tableGridStyle = {
    backgroundColor: "#fff",
    padding: "20px",
}
const QUERY= "SELECT lat, long, rider FROM Location SINCE 3 days ago";

export default class MyTestNerdpackNerdletNerdlet extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            viewport: {
                height: "100vh",
                width: "100%",
                latitude: 41.11733308672263,
                longitude: 1.2531618476542792,
                zoom: 15
            },
            data: [],
            accountId: null
        }
    }
    onChangeAccount = (accountId) => {
        this.setState({accountId})
    };

    componentDidMount(){
        this.fetchData();

        this.refresh = setInterval(async ()=>{
            this.fetchData()
        }, 1000)

    };

    componentWillUnmount(){
        clearInterval(this.refresh);
    }
   

    fetchData = () => {
        const {accountId} =this.state;
        if(accountId) {
            nrdbQuery(accountId, QUERY).then(data => {
                this.setState({data: data})
            })
        }
    
    }

     onViewportChange = (viewport) =>{
         this.setState({viewport})
     }
    
    render() {
        const {viewport, accountId} = this.state;
    
        return(
        <Grid>
            <GridItem columnSpan={12}>

                <AccountPicker
                value={this.state.accountId}
                onChange={this.onChangeAccount}
            />
            </GridItem>
            
             <GridItem columnSpan={6}>
        <MapGL
            mapboxApiAccessToken={MapKey}
            {...viewport}
            onViewportChange={(this.onViewportChange)}
        >
        {this.state.data.map((store, key)=>{
            // console.log(key)
           return <Marker key={key} latitude={parseFloat(store.lat)} longitude={parseFloat(store.long)} offsetLeft={-20} offsetTop={-10}>
               <CustomerMarker size={20}/>

               </Marker>
            
        })}
        </MapGL></GridItem>
        <GridItem columnSpan={6} style={tableGridStyle}>

         
          
           

            <Table
        items={this.state.data}
       >
        <TableHeader>
          <TableHeaderCell>Lat</TableHeaderCell>
          <TableHeaderCell>
            Long
          </TableHeaderCell>
          <TableHeaderCell>
           Rider
          </TableHeaderCell>
        
        </TableHeader>

        {({ item }) => (
          <TableRow>
              <TableRowCell>{item.lat}</TableRowCell>
            <TableRowCell>{item.long}</TableRowCell>
            <TableRowCell>{item.rider}</TableRowCell>
            
          </TableRow>
        )}
      </Table>

        </GridItem>

        
        </Grid>
         )
    }
}
