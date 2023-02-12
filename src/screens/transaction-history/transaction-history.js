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
  const {history, user_info, get_history} = props;
  const [showCalender, setShowCalender] = useState(false);
  const [isFetched, setFetched] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await get_history(user_info?.id);
    setFetched(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="My Transactions" barStyle="dark-content" />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ShimmerPlaceholder
          visible={isFetched}
          style={{flex: 1, width: '100%'}}>
          <View style={styles.body}>
            {history?.map((item, index) => {
              return (
                <TransactionItem
                  transaction={item}
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
  history: store.state.transactions,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  get_history: id => DIVIY_API.fetch_transactions(id),
};
export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory);
