//import liraries
import React, { useEffect, useState } from 'react';
import {View, ScrollView, StatusBar,SafeAreaView,FlatList, Text} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import styles from './chat.styles';
import AppHeader from '../../components/header/app-header';
import PrimaryInput from '../../components/input/primary-input';
import { mvs } from '../../services/metrices';
import Left from '../../components/chat/left';
import Right from '../../components/chat/right';
import DIVIY_API from '../../store/api-calls';
// create a component
const Chat = props => {
  const {route,user_info,conversation,get_conversation,send_message,get_chat_list}=props;
  const {user}=route.params;
  const[msg,setMsg]=useState('')
  const navigation = useNavigation();
  useEffect(()=>{
    getMessages();
  },[])
  const getMessages=async()=>{
    await get_conversation(user?.id)
    console.log(conversation)
  }
  const flatListRef = React.useRef();
  const sendMessage=async()=>{
    if(msg.length<1){
      return
    }
    var payload={
      "from": user_info?.id,
      "to": user?.id,
      "description": msg,
      "isSeen": false
    }
    const response=await send_message(payload);
    console.log(response)
    if(response?.id){
       conversation.push(response);
       setMsg('')
       await get_chat_list();
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <AppHeader title={user?.name} rightIcon='Phone' onRightIconClick={()=>navigation.navigate("CallScreen")}/>
      
          <View style={styles.body}>
          <FlatList
            ref={flatListRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:mvs(90)}}
            data={conversation}
            renderItem={({ item }) =>
             item?.from==user?.id?
              <Left msg={item} image={user?.image}/> : 
              <Right msg={item}/>
            }
            onContentSizeChange={() => flatListRef.current.scrollToEnd({animated: true})}
            keyExtractor={(item) => item.id}
            />
             <View style={styles.bottomView}>
                  <PrimaryInput value={msg} placeHolder='Type message here....' 
                   onChange={(val)=>setMsg(val)} onRightIconClick={()=>sendMessage()} rightIcon='Send' style={{paddingLeft:mvs(10)}}/>
                 
             </View>
          </View>
    </SafeAreaView>
  );
};

const mapStateToProps = store => ({
  conversation: store.state.conversation,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  get_conversation: (id) => DIVIY_API.get_conversation(id),
  send_message: (payload) => DIVIY_API.send_message(payload),
  get_chat_list: () => DIVIY_API.get_chat_list(),
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
