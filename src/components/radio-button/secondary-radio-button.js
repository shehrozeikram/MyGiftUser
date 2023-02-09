import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@react-navigation/native';
import React, {  useState } from 'react';
import { View,StyleSheet, TouchableOpacity } from 'react-native';
import { mvs } from '../../services/metrices';
import colors from '../../services/colors';
import Row from '../atoms/row';
import { UnSelectedRadioButton } from '../../assets/food-pharmacy/svgs';
import Medium from '../../presentation/typography/medium-text';
import LinearGradient from 'react-native-linear-gradient';
const SecondaryRadioButton = ({title='',style,isSelected=false,onChange}) => {
    
    return (
        <View style={{...styles.container,...style}}>
           <Row style={{alignItems:'center'}}>
              {
                isSelected?
                <TouchableOpacity onPress={onChange}>
                     <LinearGradient
                      start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}
                      colors={colors.primaryLinear}
                      borderRadius
                      style={styles.selectedRadio}>

                     </LinearGradient>
                </TouchableOpacity>
                
                :
                <TouchableOpacity onPress={onChange}>
                   <UnSelectedRadioButton/>
                </TouchableOpacity>
              }
              <Medium label={title} size={13} color={colors.black} style={{flex:1,marginLeft:mvs(23),marginRight:mvs(10)}}/>
              <Medium label={'₵30.00'} size={14} color={colors.black}/>
             </Row>
        </View>
      
    );
}
const styles = StyleSheet.create({
    container:{
       flexDirection:'row',
       alignItems:'center',
       marginTop:mvs(10),
    },
    textStyle:{
        marginLeft:mvs(18),
        color:colors.white
    },
    selectedRadio:{
        height:mvs(18),
        width:mvs(18),
        borderRadius:mvs(1000)
    }
});
export default SecondaryRadioButton;