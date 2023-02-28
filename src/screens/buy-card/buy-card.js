//import liraries
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import PrimaryButton from '../../components/buttons/button-primary';
import BuyCardComponent from '../../components/buy-card-component/buy-card-component';
import AppHeader from '../../components/header/app-header';
import PrimaryInput from '../../components/input/primary-input';
import Light from '../../presentation/typography/light-text';
import Regular from '../../presentation/typography/regular-text';
import SemiBold from '../../presentation/typography/semibold-text';
import alertService from '../../services/alert.service';
import SERVICES from '../../services/common-services';
import {mvs} from '../../services/metrices';
import styles from './buy-card-styles';
const BuyCard = props => {
  const {route, user_info} = props;
  const {card} = route.params;
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [senderName, setsendName] = useState('');
  const [image, setImage] = useState();

  const sendGift = async () => {
    if (phone?.length < 1) {
      alertService.show('Please enter receiver phone number', 'Buy Gift');
      return;
    }
    var payload = {
      sender_name: senderName,
      receiver_name: name,
      receiver_phone_number: phone,
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
  return (
    <View style={{...styles.conntainer}}>
      <AppHeader title="Send Gift" />
      <View style={{alignSelf: 'center'}}>
        <Light label={'Edit card details by your own'} color={'#50555C'} />
      </View>
      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View>
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
          </View>
          <PrimaryInput
            placeHolder="Enter receiver phone number"
            value={phone}
            onChange={val => setPhone(val)}
            onRightIconClick={() => {}}
            styleTextinput={{borderRadius: 30, padding: 0}}
            style={{borderRadius: 30, borderColor: '#DADADA', borderWidth: 1}}
            placeholderTextColor={'#50555C'}
          />
          <View style={{marginTop: mvs(30)}}>
            <SemiBold label={'What’s inside?'} color={'#B50C44'} size={18} />
            <Regular
              label={
                'This card costs you 350 SAR, you can get this in your cards list and send it to your loved one.'
              }
              color={'#50555C'}
              size={14}
              numberOfLines={3}
            />
          </View>
          <PrimaryButton
            title={'Proceed to payment'}
            onClick={() => sendGift()}
            style={{marginTop: mvs(19), marginBottom: mvs(60)}}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const mapStateToProps = store => ({
  otp: store.state.otp,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(BuyCard);
