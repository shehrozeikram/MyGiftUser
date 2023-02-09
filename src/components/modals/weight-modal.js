import React, {  useState } from 'react';
import { View,StyleSheet } from 'react-native';
import { mvs } from '../../services/metrices';
import colors from '../../services/colors';
import Modal from 'react-native-modal'
import PrimaryButton from '../buttons/button-primary';
import Medium from '../../presentation/typography/medium-text';
import { Alert } from '../../assets/svgs';
import SemiBold from '../../presentation/typography/semibold-text';
const WeightModal = ({visible=false ,onOk,onCancel}) => {
    return (
        <Modal backdropOpacity={0.7} isVisible={visible}>
              <View style={styles.container}>
                <Alert style={{alignSelf: 'center',}}/>
                <SemiBold label={"Alert!"} color={colors.darkOrange} size={20}
                style={{alignSelf:'center',marginTop:mvs(10)}}/>
                <Medium label={"The Maximum weight of packages for Delivery is 10kg."} numberOfLines={3} style={styles.desc} size={17} color={colors.black}/>
                <PrimaryButton title={"ACCEPT"} onClick={onOk}/>
                <PrimaryButton title={"CANCEL"} color={colors.whiteLinear} 
                onClick={onCancel} titleStyle={{color:colors.lightgrey1}} style={{borderWidth:1,borderColor:colors.black}}/>
             </View>
        </Modal>
      
    );
}
const styles = StyleSheet.create({
    container:{
    backgroundColor:colors.white,
    ...colors.shadow,
    borderRadius:mvs(15),
    paddingVertical:mvs(33),
    paddingHorizontal:mvs(20)
    },
    desc:{
        marginVertical:mvs(16),
        textAlign:'center',marginHorizontal:mvs(10),lineHeight:mvs(26)
    }
});
export default WeightModal;