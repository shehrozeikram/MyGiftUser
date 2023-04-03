//import liraries
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import PrimaryButton from '../../components/buttons/button-primary';
import AppHeader from '../../components/header/app-header';
import PrimaryInput from '../../components/input/primary-input';
import Light from '../../presentation/typography/light-text';
import alertService from '../../services/alert.service';
import SERVICES from '../../services/common-services';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import styles from './buy-card-styles';
import {User} from '../../assets/images/index';
import Bold from '../../presentation/typography/bold-text';
import colors from '../../services/colors';
import Regular from '../../presentation/typography/regular-text';
import PrimaryRadioButton from '../../components/radio-button/radio-button';
const BuyCard = props => {
  const {route, user_info, users, fetchUsers} = props;
  const {card} = route.params;
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [senderName, setsendName] = useState('');
  const [image, setImage] = useState();
  const [selectedUser, setSelectUser] = useState({});
  useEffect(() => {
    getData('');
  }, []);
  const getData = async q => {
    setSearch(q);
    await fetchUsers(q);
  };
  const sendGift = async () => {
    if (!selectedUser?.id) {
      alertService.show(
        'Please select the user to whom you want to send the gift',
        'Send Gift',
      );
      return;
    }
    var payload = {
      sender_name: user_info?.first_name + ' ' + user_info?.last_name,
      receiver_name: selectedUser?.first_name + ' ' + selectedUser?.last_name,
      receiver_phone_number: selectedUser?.contact_number,
      your_message: message,
      user_id: user_info?.id,
      card_id: card?.id,
      attachments: image,
    };
    console.log('Payload is ===> ', payload);
    navigation.navigate('PaymentMethod', {payload: payload});
  };
  const pickImage = async () => {
    var res = await SERVICES._returnImageGallery();
    if (res?.uri) {
      setImage(res);
    }
  };
  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.user} onPress={() => setSelectUser(item)}>
      <Image source={User} style={styles.image} />
      <View style={{flex: 1, paddingHorizontal: mvs(7)}}>
        <Bold
          label={item?.first_name + ' ' + item?.last_name}
          color={colors.black}
          size={mvs(13)}
        />
        <Regular
          label={'Phone Number:' + item?.contact_number}
          color={colors.lightgrey1}
          size={mvs(12)}
        />
      </View>
      <PrimaryRadioButton
        title=""
        style={{flex: 0, paddingHorizontal: mvs(0), paddingVertical: mvs(0)}}
        isSelected={selectedUser?.id == item?.id ? true : false}
      />
    </TouchableOpacity>
  );
  return (
    <View style={{...styles.conntainer}}>
      <AppHeader title="Send Gift" />
      <View style={{alignSelf: 'center'}}>
        <Light
          label={'Select the user to whom you want to send the gift'}
          color={'#50555C'}
          numberOfLines={2}
          style={{textAlign: 'center', marginHorizontal: mvs(30)}}
        />
      </View>
      <View style={{paddingHorizontal: mvs(17)}}>
        <PrimaryInput
          placeHolder="Enter Descriptions (optional)"
          value={message}
          onChange={val => get(val)}
          onRightIconClick={() => {}}
          styleTextinput={{borderRadius: 30, padding: 0}}
          style={{borderRadius: 30, borderColor: '#DADADA', borderWidth: 1}}
          placeholderTextColor={'#50555C'}
        />
        <PrimaryButton
          title={'Proceed to payment'}
          onClick={() => sendGift()}
          style={{marginTop: mvs(19), marginBottom: mvs(10)}}
        />
        <PrimaryInput
          placeHolder="Search User"
          value={search}
          onChange={val => getData(val)}
          onRightIconClick={() => {}}
          styleTextinput={{borderRadius: 30, padding: 0}}
          style={{borderRadius: 30, borderColor: '#DADADA', borderWidth: 1}}
          placeholderTextColor={'#50555C'}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}>
        {/* <View>
            <BuyCardComponent
              senderName={senderName}
              onChangeSenderName={val => setsendName(val)}
              receiverName={name}
              onChangeReceiverName={val => setName(val)}
              message={message}
              onChangeMessage={val => setMessage(val)}
              onChangeImage={() => pickImage()}
              image={image}
            />
          </View> */}
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flex: 1,
            marginTop: mvs(20),
            paddingBottom: mvs(40),
          }}
          data={users}
          renderItem={renderItem}
          keyExtractor={item => item?.id.toString()}
        />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = store => ({
  otp: store.state.otp,
  user_info: store.state.user_info,
  users: store.state.users,
});

const mapDispatchToProps = {
  fetchUsers: q => DIVIY_API.fetch_users(q),
};
export default connect(mapStateToProps, mapDispatchToProps)(BuyCard);
