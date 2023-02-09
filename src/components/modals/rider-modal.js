import React from 'react';
import { View,StyleSheet, TouchableOpacity } from 'react-native';
import { mvs } from '../../services/metrices';
import colors from '../../services/colors';
import Modal from 'react-native-modal'
import LinearGradient from 'react-native-linear-gradient';
import Row from '../atoms/row';
import IconButton from '../buttons/icon-button';
import Medium from '../../presentation/typography/medium-text';
import ImagePlaceholder from '../atoms/Placeholder';
import { User } from '../../assets/images';
import Regular from '../../presentation/typography/regular-text';
import { Star } from '../../assets/svgs';
const RiderModal = ({visible=false,onBlur}) => {

    return (
        <Modal isVisible={visible} backdropOpacity={0} onBackdropPress={onBlur}>
              <LinearGradient
                start={{ x: 0, y: 0.99 }} end={{ x: 0, y: 1 }}
                colors={[`${colors.black}99`,colors.black]}
                borderRadius
                style={styles.container}
                >
                <Row style={{alignItems:'center'}}>
                  <ImagePlaceholder uri={User} containerStyle={styles.imageStyle}/>
                  <View style={{flex:1,marginLeft:mvs(5)}}>
                    <Medium label={'John Smith'} size={15} color={colors.white}/>
                    <Regular label={'Bike-GTH 5689'} size={14} color={colors.white}/>
                    <Row style={{marginTop:mvs(3),alignItems:'center',justifyContent:'flex-start'}}>
                        <Star/>
                        <Regular label={'4.8'} size={14} color={colors.white} style={{marginLeft:mvs(3)}}/>
                    </Row>
                  </View>
                  
                  <Row style={{alignItems:'center'}}> 
                     <IconButton  icon='ChatSmall' style={styles.button} f={0}/>
                     <IconButton  icon='PhoneSmall' style={styles.button} f={0}/>
                  </Row>
                </Row>
               
               </LinearGradient>
        </Modal>
      
    );
}
const styles = StyleSheet.create({
    container:{
    borderRadius:mvs(15),
    position:'absolute',
    bottom:mvs(215),
    left:0,
    right:0,
    paddingHorizontal:mvs(14),
    paddingVertical:mvs(28)
    },
    imageStyle:{
        height:mvs(70),
        width:mvs(70),
        borderRadius:mvs(1000)
    },
    button:{
        height:mvs(44),width:mvs(44),
        borderRadius:mvs(1000),
        marginHorizontal:mvs(5)
    }
});
export default RiderModal;