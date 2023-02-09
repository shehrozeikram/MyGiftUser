import React from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {Store} from '../../assets/images';
import AvailableBalance from '../../components/available-balance/available-balance';
import AppHeader from '../../components/header/app-header';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import styles from './styles';
const Stores = props => {
  const {navigation} = props;
  return (
    <View style={{...styles.container}}>
      <AppHeader title="Pay at Store" />
      <Regular
        label={'Select any store to send your payment'}
        size={12}
        color={colors.lightgrey1}
        style={{marginTop: mvs(-10), alignSelf: 'center'}}
      />
      <View style={{paddingHorizontal: mvs(50), paddingVertical: mvs(30)}}>
        <AvailableBalance bgColor={colors.primary} />
      </View>
      <View style={styles.body}>
        <Bold label={'Available Stores'} size={20} color={colors.primary} />
        <View style={styles.card}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={3}
            contentContainerStyle={{
              backgroundColor: colors.white,
              paddingHorizontal: mvs(2),
              paddingBottom: mvs(5),
            }}
            data={[1, 2, 3, 4, 5, 6, 7, 89, 9, 10, 11, 12]}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('PayAtStore')}
                key={index + ' ' + item}
                style={{width: '33%'}}>
                <Image source={Store} style={styles.image} />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = store => ({
  notifications: store.state.notifications,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  get_notifications: () => DIVIY_API.get_notifications(),
};
export default connect(mapStateToProps, mapDispatchToProps)(Stores);
