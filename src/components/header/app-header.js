import React, { } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as SVG from '../../assets/svgs/index'
import { mvs } from '../../services/metrices';
import Row from '../atoms/row';
import colors from '../../services/colors';
import Bold from '../../presentation/typography/bold-text';
import { useNavigation } from '@react-navigation/native';
const AppHeader = ({title='Home',leftIcon='Back',rightIcon='',style,titleStyle,onRightIconClick}) => {
const LeftIcon=SVG[leftIcon];
const RightIcon=SVG[rightIcon];
const navigation=useNavigation()
const goBack=async=>{
   if(leftIcon=="Back"){
     navigation.goBack()
   }
}
  return (
        <Row style={{...styles.container,...style}}>
          {LeftIcon && (
            <TouchableOpacity onPress={()=>goBack()}>
                 <LeftIcon/>
            </TouchableOpacity>
         
          )}
          <View style={styles.titleView}>
               <Bold label={title} size={20} color={colors.black} style={{...titleStyle}}/>
          </View>
          {RightIcon && (
            <TouchableOpacity onPress={onRightIconClick}>
              <RightIcon/>
            </TouchableOpacity>
          )}
        </Row>
      
    );
}
const styles = StyleSheet.create({
    container:{
       alignItems:'center',
       paddingHorizontal:mvs(17),
       marginTop:mvs(25),
       marginVertical:mvs(10)  
    },
    titleView:{
        flex:1,paddingHorizontal:mvs(10),alignItems:'center'
    }
});
export default AppHeader;