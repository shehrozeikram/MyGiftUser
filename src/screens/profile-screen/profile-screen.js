import React from 'react';
import {Image, SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import AppHeader from '../../components/header/app-header';
import {ProfileImage} from '../../assets/images';
import ProfileItem from '../../components/gift-app/profile-item';
import Bold from '../../presentation/typography/bold-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import styles from './style';
import {connect} from 'react-redux';

const ProfileScreen = props => {
  const {navigation, user_info} = props;
  const profile = [
    {id: 1, title: 'My Transactions', action: 'TransactionHistory'},
    {id: 2, title: 'My Wallet', action: 'MyWallet'},
    {id: 3, title: 'My Rewards', action: 'MyRewards'},
    {id: 4, title: 'Buy Gift Cards', action: 'GiftCards'},
    {id: 5, title: 'Edit Profile', action: 'EditProfile'},
    {id: 6, title: 'Contact Us', action: 'ContactUs'},
  ];
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <AppHeader title="" />
      <ScrollView>
        <View style={styles.body}>
          <Image
            source={ProfileImage}
            style={styles.imageStyle}
            resizeMode="stretch"
          />
          <Bold
            label={`${user_info?.first_name} ${user_info?.last_name}`}
            color={colors.darkGray}
            style={styles.name}
            size={mvs(18)}
          />
          <Bold
            label={'350.78SAR'}
            color={colors.primary}
            style={{...styles.name, marginTop: mvs(3)}}
            size={mvs(18)}
          />
          <Bold
            label={'750 Points'}
            color={colors.green}
            style={{...styles.name, marginTop: mvs(3)}}
            size={mvs(12)}
          />
          <FlatList
            style={{marginTop: mvs(15)}}
            data={profile}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <ProfileItem
                key={index}
                title={item?.title}
                onClick={() => navigation.navigate(item?.action)}
              />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = store => ({
  user_info: store.state.user_info,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
