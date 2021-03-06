import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import db from '../config'


export default class MyHeader extends Component {
constructor(props){
  super(props)
    this.state = {value: ''}

}

UnReadNotifications(){
db.collection('all_notifications').where('notification_status', '==', 'unread')
.onSnapshot ((snapshot)=>{
  var unread = snapshot.docs.map((doc)=> doc.data())
    this.setState({
      value : unread.length
    })
})

}
componentDidMount(){
this.UnReadNotifications()


}

BellWithBadge = ()=>{
  return(
    <View>
      <Icon name ='bell' type = 'font-awesome' color = 'red' size = {25} 
    onPress = {()=>
      this.props.navigation.navigate('Notification')

    }/>
    <Badge
      value = {this.state.value} 
      containerStyle = {{position :'absolute', top: -4, right:-4}}
      
    />
    </View>

  )
} 


render(){
  return (
    <Header
      leftComponent={<Icon name='bars' type='font-awesome' color='blue' onPress = {()=> this.props.navigation.toggleDrawer()}/>}
      centerComponent={{ text: this.props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
      rightComponent = {<this.BellWithBadge {...this.props}/>}
      backgroundColor = "#eaf8fe"
    />
  );
      
}

}



  




