import React, {  useState } from 'react';
import { View,StyleSheet } from 'react-native';
import { mvs } from '../../services/metrices';
import colors from '../../services/colors';
import Row from '../atoms/row';
import ImagePlaceholder from '../atoms/Placeholder';
import Regular from '../../presentation/typography/regular-text';
import Bold from '../../presentation/typography/bold-text';
import { URLS } from '../../store/api-urls';
import moment from 'moment';
const MesssageItem = ({chat={}}) => {
    return (
        <View style={styles.container}>
              <Regular label={moment(chat?.messageTime).calendar()} size={12} color={colors.lightgrey1} style={{alignSelf: 'flex-end',}}/>
            <Row style={{alignItems:'center'}}>
                <ImagePlaceholder uri={{uri:`${URLS.image_url}${chat?.user?.image}`}} containerStyle={styles.imageStyle}/>
                 <View style={{flex:1,marginLeft:mvs(10)}}>
                  <Bold label={chat?.user?.name} size={15} color={colors.black}/>
                  <Regular label={chat?.lastMessage} size={12} color={colors.lightgrey1}/>
                </View>
            </Row>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
    borderRadius:mvs(15),
    paddingHorizontal:mvs(15),
    paddingVertical:mvs(13),
    ...colors.shadow,
    backgroundColor:colors.white,
    //
    marginTop:mvs(10)
    },
    imageStyle:{
    height:mvs(50),
    width:mvs(50),
    borderRadius:mvs(1000)
    }
});
export default MesssageItem;