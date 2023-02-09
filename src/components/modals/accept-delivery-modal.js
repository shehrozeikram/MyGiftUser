import React from 'react';
import { View,StyleSheet } from 'react-native';
import { mvs } from '../../services/metrices';
import colors from '../../services/colors';
import Modal from 'react-native-modal'
import PrimaryButton from '../buttons/button-primary';
import Regular from '../../presentation/typography/regular-text';
import Bold from '../../presentation/typography/bold-text';
import ImagePlaceholder from '../atoms/Placeholder';
import { User } from '../../assets/images';
import { LocationPath, Star } from '../../assets/svgs';
import Row from '../atoms/row';
import IconButton from '../buttons/icon-button';
const AcceptModal = ({visible=false ,onOk,onCancel,onCall}) => {
    return (
        <Modal backdropOpacity={0.7} isVisible={visible}>
           <View style={styles.container}>
              <Row style={{alignItems:'center',}}>
                <ImagePlaceholder uri={User} containerStyle={styles.imageStyle}/>
                 <View style={{flex:1,marginLeft:mvs(10),width:'100%'}}>
                    <Row style={{flex:1,alignItems:'center',justifyContent:'flex-start'}}>
                       <Bold label={'John Smith'} size={15} color={colors.black}/>
                       <Star style={{marginLeft:5}}/>
                       <Regular label={'4.7'} size={14} color={colors.lightgrey1} style={{marginLeft:5}}/>
                    </Row>
                  <Regular label={'Bike-GTH 5689'} size={14} color={colors.lightgrey1}/>
                </View>
                <View>
                   <IconButton icon='PhoneSmall' style={styles.button} onClick={onCall}/>
                </View>
              </Row>
            <Row style={{marginTop:mvs(14)}}>
                   <LocationPath/>
                    <View style={styles.locationView}>
                        <Regular label={'46019 Kuhic Shoals'} size={14} color={colors.black}/>
                        <Regular label={'46019 Kuhic Shoals'} size={14} color={colors.black}/>
                    </View>
             </Row>
               <Bold label={'₵25.00'} size={14} color={colors.black} style={{alignSelf: 'flex-start',marginLeft:mvs(5),marginTop:mvs(14)}}/>
                <PrimaryButton title={"PROCEED TO PAYMENT"} onClick={onOk}  style={{marginTop:mvs(19)}}/>
                <PrimaryButton title={"REJECT"} color={colors.whiteLinear} 
                 onClick={onCancel} titleStyle={{color:colors.lightgrey1}}
                 style={{borderWidth:1,borderColor:colors.black}}/>
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
    paddingHorizontal:mvs(20),
   // height:mvs(400)
    },
    imageStyle:{
        height:mvs(50),
        width:mvs(50),
        borderRadius:mvs(1000)
    },
    button:{
        height:mvs(44),width:mvs(44),
        borderRadius:mvs(1000),
        alignSelf:'flex-end'
    },
    locationView:{
        flex:1,
        paddingLeft:mvs(15),
        justifyContent:'space-between',
        height:mvs(75)
    }
});
export default AcceptModal;