//import liraries
import React, {useEffect, useState} from 'react';
import {View, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import styles from './transaction-history.styles';
import TransactionItem from '../../components/transaction/transaction-history-item';
import DIVIY_API from '../../store/api-calls';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../../components/header/app-header';
import GiftModal from '../../components/modals/gift-modal';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
// create a component
const TransactionHistory = props => {
  const {parcel_history, get_parcel_history, navigation} = props;
  const [history] = useState([
    {
      date: '09 June 2022',
      data: [{}, {}],
    },
  ]);
  const [showCalender, setShowCalender] = useState(false);
  const [onSwtich, setSwtich] = useState(true);
  const [isFetched, setFetched] = useState(false);
  useEffect(() => {}, []);
  const getParcelHistory = async () => {
    await get_parcel_history();
    setFetched(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="My Transactions" barStyle="dark-content" />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ShimmerPlaceholder
          visible={!isFetched}
          style={{flex: 1, width: '100%'}}>
          <View style={styles.body}>
            {[1, 2, 3, 4, 5]?.map((item, index) => {
              return (
                <TransactionItem
                  parcel={item}
                  key={index}
                  onClick={() => setShowCalender(true)}
                />
              );
            })}
          </View>
        </ShimmerPlaceholder>
        <GiftModal
          visible={showCalender}
          onCancel={() => setShowCalender(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = store => ({
  parcel_history: store.state.parcel_history,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  get_parcel_history: () => DIVIY_API.get_parcel_history(),
};
export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory);
