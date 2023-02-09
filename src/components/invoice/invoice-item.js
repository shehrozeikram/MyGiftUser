
import React from 'react';
import { View,StyleSheet } from 'react-native';
import { mvs } from '../../services/metrices';
import Row from '../atoms/row';
import colors from '../../services/colors';
import Regular from '../../presentation/typography/regular-text';
import Bold from '../../presentation/typography/bold-text';
const InvoiceItem = ({rightTitle,leftTitle,rightValue="",leftValue=""}) => {

    return (
        <Row style={styles.container}>
           <View style={{flex:1}}>
                <Regular label={leftTitle} size={14} color={colors.lightgrey1}/>
                <Bold size={17} label={leftValue} color={colors.black} numberOfLines={3}/>

              </View>
            
            {rightTitle &&
              (<View style={{flex:1,paddingLeft:mvs(20)}}>
                <Regular label={rightTitle} size={14} color={colors.lightgrey1}/>
                <Bold size={17} label={rightValue} color={colors.black} numberOfLines={3}/>
              </View>
              )}

             
        </Row>
    );
}
const styles = StyleSheet.create({
    container:{
       alignItems:'center',
       marginTop:mvs(20)
    },
    textStyle:{
        marginLeft:mvs(18),
        color:colors.white
    }
});
export default InvoiceItem;