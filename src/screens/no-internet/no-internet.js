//import liraries
import React, { useEffect } from 'react';
import {View, ScrollView,SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import { NoConnection } from '../../assets/svgs';
import PrimaryButton from '../../components/buttons/button-primary';
import Bold from '../../presentation/typography/bold-text';
import colors from '../../services/colors';
import styles from './style';
// create a component
const NoInternet = props => {
  const{route,navigation}=props;
  const{id}=route.params;
  useEffect(()=>{
    console.log("Interval id is getting clear",id)
    clearInterval(id)
  },[]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
       <View style={styles.body}>
           <NoConnection/>
           <View style={{position:'absolute',bottom:100,left:22,right:22}}>
             <Bold label={"Oops! You are offline"} size={23} color={colors.primary} style={{alignSelf: 'center'}}/>
             <PrimaryButton title='Back To Home' titleStyle={{marginLeft:0}}
              onClick={()=>navigation.replace("DrawerNavigator")}/>
           </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = store => ({
});

const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(NoInternet);
