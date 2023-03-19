import React, {useEffect} from 'react';
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
import {IP} from '../../store/api-urls';
import styles from './styles';
const Stores = props => {
  const {
    navigation,
    fetch_stores,
    stores,
    user_info,
    wallet,
    fetch_wallet,
    route,
  } = props;
  useEffect(() => {
    getData();
    console.log('User info ===> ', user_info);
  }, []);
  const getData = async () => {
    await fetch_stores();
    await fetch_wallet(user_info?.id);
  };
  console.log('Wallet is ', wallet);
  return (
    <View style={{...styles.container}}>
      <AppHeader
        title={route?.params?.withdraw ? 'Withdraw from Store' : 'Pay at Store'}
      />
      <Regular
        label={'Select any store to send your payment'}
        size={12}
        color={colors.lightgrey1}
        style={{marginTop: mvs(-10), alignSelf: 'center'}}
      />
      <View style={{paddingHorizontal: mvs(50), paddingVertical: mvs(30)}}>
        <AvailableBalance
          bgColor={colors.primary}
          balance={wallet?.user_balance ? wallet?.user_balance : 0}
        />
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
            data={stores}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    route?.params?.withdraw ? 'WithdrawRequest' : 'PayAtStore',
                    {selected_store: item},
                  )
                }
                style={{width: '33%'}}>
                <Image
                  source={{uri: IP + item?.attachments[0]?.url}}
                  style={styles.image}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = store => ({
  stores: store.state.stores,
  user_info: store.state.user_info,
  wallet: store.state.wallet,
});

const mapDispatchToProps = {
  fetch_stores: () => DIVIY_API.fetch_stores(),
  fetch_wallet: userId => DIVIY_API.fetch_wallet(userId),
};
export default connect(mapStateToProps, mapDispatchToProps)(Stores);
