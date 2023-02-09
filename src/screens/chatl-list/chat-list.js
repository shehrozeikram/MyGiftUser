//import liraries
import React,{useEffect, useState} from 'react';
import {View, ScrollView, StatusBar,SafeAreaView,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import styles from './chat-list.styles';
import AppHeader from '../../components/header/app-header';
import MesssageItem from '../../components/message-notification/message-item';
import colors from '../../services/colors';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
import Medium from '../../presentation/typography/medium-text';
import DIVIY_API from '../../store/api-calls';

// create a component
const ChatList = props => {
  const{chats,get_chat_list,navigation}=props;
  const[history]=useState([
    {
      date:'09 June 2022',
      data: [ {},{} ]
    }
  ])
  const [isFetched,setFetched]=useState(false);
  useEffect(()=>{
    getChatList();
  },[])
  const getChatList=async()=>{
    await get_chat_list()
    setFetched(true)
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <AppHeader title="MESSAGES"/>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
         <ShimmerPlaceholder visible={isFetched} style={{flex:1,width:'100%'}}>
          <View style={styles.body}>
            {
              history.map((element,index) => {
                return (
                  <View key={index}>
                      {/* <Regular label={element.date} size={12} color={colors.black} style={{marginTop:mvs(10)}}/> */}
                      {   chats.map((item,index) => {
                            return (
                               <TouchableOpacity key={index} onPress={()=>navigation.navigate("Chat",{user:item?.user})}>  
                                  <MesssageItem chat={item}/>
                               </TouchableOpacity>
                           );})
                       }
                  </View>
                );
              })
             }
             
          </View>
         </ShimmerPlaceholder> 
          <LinearGradient
                 start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}
                 colors={[`${colors.white}20`,colors.white]}
                 style={styles.bottomView}>
                <Medium label={''}/>
          </LinearGradient>
        </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = store => ({
  chats: store.state.chats,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  get_chat_list: () => DIVIY_API.get_chat_list(),
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
