//import liraries
import React, {useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, StatusBar, View} from 'react-native';
import {connect} from 'react-redux';
import {ProfileImage} from '../../assets/images';
import Row from '../../components/atoms/row';
import PrimaryButton from '../../components/buttons/button-primary';
import TransactionItem from '../../components/transaction/transaction-history-item';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import SemiBold from '../../presentation/typography/semibold-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import styles from './style';
// create a component
const Wallet = props => {
  const {history, user_info, get_history} = props;
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await get_history(user_info?.id);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <View style={styles.body}>
        <Row
          alignItems="center"
          style={{paddingHorizontal: mvs(20), marginVertical: mvs(25)}}>
          <View>
            <SemiBold
              label={`Hello, ${user_info?.first_name}!`}
              size={24}
              color={colors.lightgrey2}
            />
            <Regular
              label={'Your active payment is here'}
              size={12}
              color={colors.lightgrey1}
            />
          </View>
          <Image source={ProfileImage} style={styles.image} />
        </Row>
        <View style={styles.balance}>
          <Bold label={'350.79 SAR'} size={28} color={colors.primary} />
          <Regular
            label={'Your remaining balance'}
            size={12}
            color={colors.lightgrey1}
          />
          <Bold
            label={'750 Points'}
            color={colors.green}
            style={{...styles.name, marginTop: mvs(3)}}
            size={mvs(14)}
          />
        </View>
        <PrimaryButton
          title="Pay at Store"
          style={styles.button}
          onClick={() => props?.navigation.navigate('Stores')}
          titleStyle={styles.buttonText}
        />
        <Row
          alignItems="center"
          style={{paddingHorizontal: mvs(30), marginVertical: mvs(10)}}>
          {/* <PrimaryButton
            title="Withdraw"
            style={styles.button}
            onClick={() => navigation.navigate('WithdrawRequest')}
            titleStyle={styles.buttonText}
          /> */}
        </Row>
        <SemiBold
          label={'Latest Transactions'}
          size={18}
          style={{marginTop: mvs(25)}}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{marginTop: mvs(10)}}
          contentContainerStyle={{
            backgroundColor: colors.white,
            paddingHorizontal: mvs(5),
            paddingBottom: mvs(10),
          }}
          data={history}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <TransactionItem transaction={item} key={index} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = store => ({
  history: store.state.transactions,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  get_history: id => DIVIY_API.fetch_transactions(id),
};
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
