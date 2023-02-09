import React, { } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import * as SVG from '../../assets/svgs/index'
import { mvs } from '../../services/metrices';
import Row from '../atoms/row';
import colors from '../../services/colors';
const SearchInput = ({placeHolder='Search',leftIcon='BackTwo',value='',
rightIcon='',onChange,style}) => {
const LeftIcon=SVG[leftIcon];
const RightIcon=SVG[rightIcon];

    return (
        <Row style={{...styles.container,...style}}>
          {LeftIcon && (
            <LeftIcon/>
          )}
           <SVG.VerticalLine style={{marginHorizontal:mvs(18)}}/>  
          <TextInput
           placeholder={placeHolder} 
           style={{...styles.input}} placeholderTextColor={colors.lightgrey1} onChangeText={onChange}/>
          {RightIcon && (
            <RightIcon/>
          )}
        </Row>
      
    );
}
const styles = StyleSheet.create({
    container:{
       alignItems:'center',
       height:mvs(52),
       paddingVertical:mvs(4),
       borderRadius:mvs(8),
       marginTop:mvs(20),
       ...colors.shadow,
       backgroundColor:colors.white,
       paddingHorizontal:mvs(20),
       borderColor:colors.primary
    },
    input:{
        flex:1,
        fontSize:15
    }
});
export default SearchInput;