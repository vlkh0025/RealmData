
import React, { Component } from 'react';
import {
  StyleSheet,
  View, 
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ReversedFlatList from 'react-native-reversed-flat-list'; 
import { Container, Header, Content, Form, Item, Input, Label,Title,Body,Button,Text,List,ListItem,Thumbnail,Left, Right,SwipeRow,Icon } from 'native-base';
const Realm = require('realm');
import { ListView } from 'realm/react-native';

const CarSchema2 = {
    name: 'Car2',
    primaryKey: 'carID',
    properties: {
        carID: 'int',
        make: 'string',
        model: 'string',
        midels:  'string',
    }
};


export default class App extends Component {
    
    constructor(props){
        super(props);
        this.state ={
            //id:0,
            mang: [],
            make:'',
            model:'',
            midels:'',
            realm: null,
            first:0,
            end:5,
        }
    };
    componentDidMount(){
        // Initialize a Realm with Car and Person models
       let realm =  Realm.open({schema: [CarSchema2]})
        .then(realm => { 
           let cars = realm.objects('Car2');
           // get first 5 Car objects
           let firstCars = cars.slice(this.state.first, this.state.end);
        
              this.setState({ 
                  realm,
                  mang:cars,
             });
            
        }); 
        
        
    }
   
    Add(){
        
        let realm =  Realm.open({schema: [CarSchema2]})
        .then(realm => {
            let highestId = realm.objects('Car2').length;
            let carEnd = realm.objects('Car2');
            var max; 
            max = carEnd[0].carID
            for(i=0;i<carEnd.length;i++){
                if(max < carEnd[i].carID){
                    max = carEnd[i].carID;
                }
            }
            if(highestId == null) {
                max = 0;
             } else {
                
                max = max + 1;
             }
             realm.write(() => {
                realm.create('Car2', {
                    carID: max, 
                    make:this.state.make, 
                    model:this.state.model,
                     midels:this.state.midels,
                });
              });
            let cars = realm.objects('Car2');
            let firstCars = cars.slice(this.state.first, this.state.end);
            this.setState({
                realm,
                id:max,
                mang:cars,
            });
        });
                  
    };
    _ItemLoadMore(){

    };

    Delete(abc){
        let realm = Realm.open({schema: [CarSchema2]})
        .then(realm => {
            let carList = realm.objects('Car2');
            let carDelete = carList.filtered('carID ='+abc);
            realm.write(() => {
                realm.delete(carDelete);
            })
            //let carListUp = realm.objects('Car2');
            
            this.setState({
                realm,
                //id:id,
                mang:carList,
        });
        
        })
    };

    Detail(abc){
        this.props.navigation.navigate('Detail', {abc});
    };

    

    render() {
        
        const info = this.state.realm
        ? 'Number of dogs in this Realm: ' + this.state.realm.objects('Car2').length
        : 'Loading...'
        return (
        <Container>
        <Header>
        <Title style={{marginTop:15}}>Realm</Title>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>car Maked</Label>
              <Input onChangeText={(make) => this.setState({make})}
                    value={this.state.make} />
            </Item>
            <Item floatingLabel>
            <Label>Model</Label>
            <Input onChangeText={(model) => this.setState({model})}
                    value={this.state.model}/>
          </Item>
            <Item floatingLabel last>
              <Label>Midels</Label>
              <Input onChangeText={(midels) => this.setState({midels})}
                    value={this.state.midels} 
                    keyboardType = 'numeric'
                    maxLength = {10}  //setting limit of input
                    />
            </Item>
            <Button full dark
              onPress={()=>{this.Add()}}>
            <Text>Add</Text>
          </Button>
          </Form>
        </Content>
        <Content>
          <List >
          <FlatList
          //load more list view
          onEndReachedThreshold = {10}
          onEndReached = {()=>{
              {
                  /* this.setState({      
                  first:this.state.first + 5,
                  end:this.state.end + 5,
              });
              let realm =  Realm.open({schema: [CarSchema2]})
                .then(realm => { 
                  let cars = realm.objects('Car2');
                // get first 5 Car objects
                  let firstCars = cars.slice(this.state.first, this.state.end);
                    //let carList = realm.objects('Car2');
                     this.setState({ 
                         realm,
                         mang:firstCars,
                     });
            
                });  */
                }
          }
        }
        //ref='_flatList'
          //pagingEnabled
          style={{transform: [{ scaleY: -1 }] }}
            data={this.state.mang}
            keyExtractor={(item, index) => item.carID}
            renderItem={({item}) => 
            
            <ListItem avatar style={{ transform: [{ scaleY: -1 }]}}
                
            >
            <Content scrollEnabled={false}>
            <SwipeRow 
            leftOpenValue={75}
            rightOpenValue={-75}
            left={
              <Button success onPress={() => alert('Add')}>
                <Icon active name="add" />
              </Button>
            } body={
             <TouchableOpacity onPress={()=>{this.Detail(item)}} style={{width:380}}  >
              <Left>
              </Left>
              <Body>
                <Text note>{item.make}</Text>
                <Text note>{item.model}</Text>
              </Body>
              <Right>
                <Text note>{item.miles}</Text>
                <Text note>{item.carID}</Text>
                <Text note>{info}</Text>
                <Text>{this.state.id}</Text>
              </Right>
              </TouchableOpacity>
            }right={
              <Button danger onPress={()=>{this.Delete(item.carID)}}>
                <Icon active name="trash" />
              </Button>
            }
            />
            </Content>
            </ListItem>
            //
            }
            
            />
            
          </List>
        </Content>
      </Container>
        );
    }
}



