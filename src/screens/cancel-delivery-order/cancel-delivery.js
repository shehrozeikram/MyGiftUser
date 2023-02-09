//import liraries
import React, { useEffect, useState } from 'react';
import {View, ScrollView, StatusBar,SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import styles from './cancel-delivery.styles';
import Bold from '../../presentation/typography/bold-text';
import AppHeader from '../../components/header/app-header';
import PrimaryButton from '../../components/buttons/button-primary';
import { mvs } from '../../services/metrices';
import PrimaryRadioButton from '../../components/radio-button/radio-button';
const buttons=[
  {id:1,title:"Taking too Long to Find Rider",selected:true},
  {id:2,title:"Rider isn’t here",selected:false},
  {id:3,title:"Rider isn’t moving",selected:false},
  {id:4,title:"Rider asked me to cancel",selected:false},
  {id:5,title:"Change my mind",selected:false},
  {id:6,title:"Other",selected:false},
]

// create a component
const CancelDelivery = props => {
 
  const navigation = useNavigation();
  const[radioButtons,setRadioButtons]=useState(buttons)
  const[radioChange,setRadioChange]=useState(false)
  const setSelection=async(button,index)=>{
     for(var i=0;i<buttons.length;i++){
      buttons[i].selected=false;
     }
     buttons[index].selected=!button.selected;
     setRadioButtons(buttons);
     setRadioChange(!radioChange)
  }
  useEffect(()=>{

  },[radioChange])
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
     <AppHeader title='CANCEL RIDE'/>
       <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.body}>
            {radioButtons.map((item,index) => {
               return(
                     <PrimaryRadioButton title={item.title} key={item.id}
                      isSelected={item.selected} onChange={()=>setSelection(item,index)}/>            
                );})
             }
             <View style={{flex:1,justifyContent:'flex-end',paddingBottom:mvs(30)}}>
               <PrimaryButton title='DONE' />
             </View>
              
          </View>
        
        </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = store => ({
  home_categories: store.state.home_categories,
  categories: store.state.categories,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  fetchHomeCategories: () => DIVIY_API.fetchHomeCategories(),
  fetchSubCategories: parent_cat_id =>
    DIVIY_API.fetchSubCategories(parent_cat_id),
};
export default connect(mapStateToProps, mapDispatchToProps)(CancelDelivery);
