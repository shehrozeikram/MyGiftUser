import React from 'react';
import { View,StyleSheet } from 'react-native';
import { mvs } from '../../services/metrices';
import colors from '../../services/colors';
import Row from '../atoms/row';
import Regular from '../../presentation/typography/regular-text';
import Bold from '../../presentation/typography/bold-text';
import * as SVG from '../../assets/svgs/notifcation-icons/index'
import moment from 'moment';
const NotificationItem = ({notification={}}) => {
    
    const Icon=SVG[notification?.deliveryNotification?.icon]
    return (
        <View style={styles.container}>
              <Regular label={moment(notification?.created).format('LTS')} size={12} color={colors.lightgrey1} style={{alignSelf: 'flex-end',}}/>
            <Row style={{alignItems:'center'}}>
                { Icon &&
                    (
                        <Icon/>
                    )
                }
                 <View style={{flex:1,marginLeft:mvs(10)}}>
                  <Bold label={notification?.deliveryNotification?.title} size={15} color={colors.black}/>
                  <Regular label={notification?.deliveryNotification?.subTitle} size={12} color={colors.lightgrey1}/>
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
    marginTop:mvs(10)
    },
    imageStyle:{
    height:mvs(50),
    width:mvs(50),
    borderRadius:mvs(1000)
    }
});
export default NotificationItem;