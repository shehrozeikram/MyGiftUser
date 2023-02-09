//import liraries
import React, { useState } from 'react';
import {View, ScrollView, StatusBar,SafeAreaView, ImageBackground, TouchableOpacity,FlatList} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import { mvs } from '../../services/metrices';

import colors from '../../services/colors';
import Regular from '../../presentation/typography/regular-text';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import { Header } from '../../assets/food-pharmacy/images';
import { Cart, CurrentLocation, HeaderIcon, Menu, Parcel, Pharmacy, Restaurant } from '../../assets/food-pharmacy/svgs';
import Row from '../../components/atoms/row';
import SemiBold from '../../presentation/typography/semibold-text';
import PrimaryButton from '../../components/buttons/button-primary';
import Bold from '../../presentation/typography/bold-text';
import Medium from '../../presentation/typography/medium-text';
import FoodItem from '../../components/restaurant/food-item';
// create a component
const Dashboard = props => {
  const[msg,setMsg]=useState('')
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.mappath} barStyle="light-content" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View>
            <HeaderIcon/>
            <ImageBackground borderBottomLeftRadius={100} borderBottomRightRadius={100}
             source={Header} style={styles.absoluteImage}>
               <Row>
                <TouchableOpacity>
                   <Menu/>
                </TouchableOpacity>
                <TouchableOpacity>
                 <Cart/>
               </TouchableOpacity>
               </Row>
               <View style={styles.locationView}>
                   <Regular label={'your Location'} size={12} color={colors.lightgrey1}/>
                   <Row style={{marginTop:mvs(9),alignItems: 'center',}}>
                      <CurrentLocation/>
                      <View style={{marginHorizontal:mvs(10),flex:1}}>
                         <SemiBold label={'Mall Plaza Avenue'} size={12} color={colors.black}/>
                         <SemiBold label={'samarinda City, East borneo'} size={9} color={colors.lightgrey1}/>
                      </View>
                      <PrimaryButton title='Change' style={styles.btnChange} titleStyle={{fontSize:12,marginLeft:0}}/>
                   </Row>

               </View>
            </ImageBackground>
        </View>
         <View style={styles.body}>
           <View style={{marginLeft:mvs(34)}}>
             <Bold size={16} color={colors.black} label={'👋 Good Evening, John Doe'}/>
             <Regular label={"What’s for dinner?There are 567 restaurants in your area"}
              numberOfLines={2} size={10} style={{width:mvs(187)}}/>
           </View>
            
              <TouchableOpacity onPress={()=>navigation.navigate("DrawerNavigator")}>
                <Row style={styles.parcelOption}>
                  <View style={{alignSelf:'flex-end'}}>
                    <Medium size={16} label={'Parcel Delivery'} color={colors.white}/>
                    <Regular label={"Your Package in our safe hands."} size={10} color={colors.white}/>
                  </View>
                  <Parcel/>
                </Row>
              </TouchableOpacity>
          
           <Row style={styles.foodPharmacyView}>
               <TouchableOpacity style={styles.restaurantOption} onPress={()=>navigation.navigate("RestaurantHome")}>
                   <Restaurant/>
                   <View style={{paddingHorizontal:mvs(8),paddingTop:mvs(8),paddingBottom:mvs(20)}}>
                      <Medium size={16} label={'Restaurents'} color={colors.black}/>
                      <Regular label={"Everyday up to\n25% off"} numberOfLines={2} size={10} color={colors.black}/>
                   </View>
               </TouchableOpacity>
               <TouchableOpacity style={styles.pharmacyOption} onPress={()=>navigation.navigate("PharmacyHome")}>
                  <Pharmacy style={{marginLeft:mvs(26)}}/>
                  <View style={{paddingHorizontal:mvs(13),paddingVertical:mvs(20)}}>
                      <Medium size={16} label={'Pharmacy'} color={colors.black}/>
                      <Regular label={"Everyday up to\n25% off"} numberOfLines={2} size={10} color={colors.black}/>
                   </View>
              </TouchableOpacity>
           </Row>
           <Bold label={"Restaurants"} size={18} color={colors.black} style={{marginHorizontal:mvs(30),marginVertical:mvs(19)}}/>
             <FlatList  
              contentContainerStyle={{paddingLeft:mvs(19)}}
              data={[1,2,3,4]}  
              horizontal
              renderItem={({item}) =>  
               <FoodItem/>
             }/>

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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
