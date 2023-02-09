import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Bold from '../../presentation/typography/bold-text';
import colors from '../../services/colors';
import { mvs, width } from '../../services/metrices';
import Row from '../atoms/row';
const VehicleTypeModal = ({
    title="Select Vehicle Type",
    value,
    setValue=(arg)=>{},
    visible,
    setVisible =(bool)=>{},
    items = [],
}) => {
    return (
        <ReactNativeModal
            propagateSwipe
            isVisible={visible}
            onBackdropPress={() => setVisible(false)}
            onSwipeComplete={() => setVisible(false)}
            swipeDirection='up'
            style={{ margin: 0 }}>
         
            <View style={styles.container}>
              {items &&(<>
                    <Bold label={title}/>
                 
                    {items?.map((item, index) => (
                        <TouchableOpacity key={index} style={{ width: '100%' }} onPress={() => {
                            setValue(item);
                        }}>
                            <Row style={{ ...styles.PAYMENTDROPDOWN, }}>
                              <Bold label={item?.type} color={colors.black} size={17}/>
                            <View>
                        
                            </View>
                            </Row>
                        </TouchableOpacity>
                    ))}
                </>)}
            </View>
            
        </ReactNativeModal>
    );
};
export default VehicleTypeModal;
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: width,
        backgroundColor: colors.white,
        borderTopLeftRadius: mvs(15),
        borderTopRightRadius: mvs(15),
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center',
    },
    PAYMENTDROPDOWN: {
        justifyContent: 'space-between',
        height: mvs(50),
        alignItems: 'center',
        borderRadius: 10,
        top: mvs(8),
        borderBottomWidth: 0.9,
        borderColor: colors.gray,
        paddingHorizontal: mvs(11),
        paddingVertical:mvs(10)
    }
});