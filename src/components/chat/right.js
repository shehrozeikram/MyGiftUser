import React from 'react';
import {StyleSheet,View } from 'react-native';
import { mvs } from '../../services/metrices';
import colors from '../../services/colors';
import Regular from '../../presentation/typography/regular-text';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
const Right = ({msg={}}) => {

    return (
        <View style={styles.container}>
                  <LinearGradient
                   start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}
                   colors={colors.primaryLinear} 
                   style={styles.textView}> 
                     <Regular numberOfLines={20} color={colors.white} size={12}
                      label={msg?.description}/>
                 </LinearGradient>
                 <Regular label={moment(msg?.created).calendar()} size={10} color={colors.mappath} style={{alignSelf:'flex-end'}}/>
           
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        maxWidth:'75%',
        alignSelf:'flex-end',
        marginTop:mvs(8),
       
    },
    textView:{
        paddingHorizontal:mvs(18),
        paddingVertical:mvs(10),
        borderRadius:mvs(15),
        borderBottomRightRadius:mvs(0)
    },
    image:{
        height:mvs(50),
        width:mvs(50),
        borderRadius:mvs(1000)
    }
});
export default Right;