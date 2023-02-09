import React from 'react';
import {StyleSheet,View } from 'react-native';
import { mvs } from '../../services/metrices';
import Row from '../atoms/row';
import colors from '../../services/colors';
import ImagePlaceholder from '../atoms/Placeholder';
import Regular from '../../presentation/typography/regular-text';
import { URLS } from '../../store/api-urls';
import moment from 'moment';
const Left = ({msg={},image=''}) => {

    return (
        <Row style={styles.container}>
                <ImagePlaceholder uri={{uri:`${URLS.image_url}${image}`}} containerStyle={styles.image}/>
                <View style={styles.textView}> 
                     <Regular numberOfLines={20} color={colors.black} size={12}
                      label={msg?.description}/>
                     <Regular label={moment(msg?.created).calendar()} size={10} color={colors.mappath}/>
                </View>
        </Row>
    );
}
const styles = StyleSheet.create({
    container:{
        maxWidth:'75%',
        alignSelf:'flex-start',
        marginTop:mvs(5),
       
    },
    textView:{
        paddingHorizontal:mvs(10),
        
    },
    image:{
        height:mvs(50),
        width:mvs(50),
        borderRadius:mvs(1000)
    }
});
export default Left;