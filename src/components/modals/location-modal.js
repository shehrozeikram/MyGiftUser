import React from 'react';
import { View,StyleSheet } from 'react-native';

import { mvs } from '../../services/metrices';
import colors from '../../services/colors';
import Modal from 'react-native-modal'

import LinearGradient from 'react-native-linear-gradient';
import Row from '../atoms/row';
import Regular from '../../presentation/typography/regular-text';
import { LocationPath } from '../../assets/svgs';
import SemiBold from '../../presentation/typography/semibold-text';
const LocationModal = ({visible=false,onBlur}) => {

    return (
        <Modal isVisible={visible} backdropOpacity={0} onBackdropPress={onBlur}>
              <LinearGradient
                start={{ x: 0, y: 0.99 }} end={{ x: 0, y: 1 }}
                colors={[`${colors.black}99`,colors.black]}
                borderRadius
                style={styles.container}
                >
                <Row style={{flex:1}}>
                   <LocationPath/>
                    <View style={{flex:1,paddingHorizontal:mvs(10),justifyContent:'space-between',height:'100%'}}>
                        <Row style={{alignItems:'center'}}>
                            <Regular label={'46019 Kuhic Shoals'} size={14} color={colors.white}/>
                            <SemiBold label={'₵25.00'} size={14} color={colors.white}/>
                        </Row>
                        <Regular label={'46019 Kuhic Shoals'} size={14} color={colors.white}/>
                    </View>
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
export default LocationModal;