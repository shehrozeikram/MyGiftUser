import React from 'react';
import { StyleSheet, TouchableOpacity, View,FlatList } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { SelectedCard, UnSelectedCard } from '../../../assets/svgs';
import Bold from '../../../presentation/typography/bold-text';
import colors from '../../../services/colors';
import { mvs, width } from '../../../services/metrices';
import Row from '../../atoms/row';
import WorkerModalItem from '../../service-offering/worker-modal-item';
const WorkerModal = ({
    title,
    value,
    setValue=(arg)=>{},
    visible,
    setVisible =(bool)=>{},
    items = [],
}) => {
   console.log(items)
    return (
        <ReactNativeModal
            propagateSwipe
            isVisible={visible}
            onBackdropPress={() => setVisible(false)}
            onSwipeComplete={() => setVisible(false)}
            swipeDirection='up'
            style={{ margin: 0 }}>
         
            <View style={styles.container}>
                <>
                <Bold label={`Assign Worker`}/>
                 
                    {items.map((item, index) => (
                        <TouchableOpacity key={index} style={{ width: '100%' }} onPress={() => {
                            setValue(item);
                        }}>
                            <Row style={{ ...styles.PAYMENTDROPDOWN, }}>
                              <WorkerModalItem name={item?.name} image={item?.image}/>
                            <View>
                                {item?.id === value?.id ?<SelectedCard />:<UnSelectedCard/>}
                            </View>
                            </Row>
                        </TouchableOpacity>
                    ))}
                 
                </>
            </View>
            
        </ReactNativeModal>
    );
};
export default WorkerModal;
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
        height: mvs(90),
        alignItems: 'center',
        borderRadius: 10,
        top: mvs(8),
        borderBottomWidth: 0.7,
        borderColor: colors.gray,
        paddingHorizontal: mvs(11),
        paddingVertical:mvs(10)
    }
});