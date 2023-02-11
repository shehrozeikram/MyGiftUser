import {Picker} from '@react-native-picker/picker';
import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {mvs} from '../../services/metrices';
import LinearGradient from 'react-native-linear-gradient';
import Bold from '../../presentation/typography/bold-text';
import {ScrollView} from 'react-native-gesture-handler';
import {MyGift, MyGift2, Plus} from '../../assets/svgs';
import PrimaryInput from '../input/primary-input';
import Regular from '../../presentation/typography/regular-text';
import {colors} from 'react-native-elements';
import Row from '../atoms/row';
import Light from '../../presentation/typography/light-text';
import {Image} from 'react-native';
const BuyCardComponent = ({
  senderName,
  onChangeSenderName,
  message,
  onChangeMessage,
  receiverName,
  onChangeReceiverName,
  image,
  onChangeImage,
}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <LinearGradient
          start={{x: 0.5, y: 0.5}}
          end={{x: 0.5, y: 0.5}}
          colors={[`#EDB82D`, `#FFB800`, `#EDB82D`, `#FBBC05`]}
          style={{
            borderRadius: 18,
            borderWidth: 3,
            borderColor: '#EDB82D',
            padding: mvs(15),
          }}>
          <Row>
            <PrimaryInput
              placeHolder="Sender name"
              value={senderName}
              onChange={onChangeSenderName}
              onRightIconClick={() => {}}
              styleTextinput={{borderRadius: 10, padding: 0}}
              style={styles.sender}
              placeholderTextColor={'#00000050'}
            />
            <MyGift2 />
          </Row>
          <PrimaryInput
            placeHolder="Your message....."
            value={message}
            onChange={onChangeMessage}
            numberOfLines={6}
            multiline={true}
            onRightIconClick={() => {}}
            style={{
              backgroundColor: '#BD7B10',
              height: mvs(113),
              borderColor: '#BD7B10',
            }}
            placeholderTextColor={'#00000050'}
            styleTextinput={{
              borderRadius: 10,
              paddingTop: 10,
              textAlignVertical: 'top',
            }}
            lineHeight={23}
          />
          <Row alignItems={'center'} style={{marginTop: mvs(20)}}>
            <TouchableOpacity
              onPress={onChangeImage}
              style={{alignItems: 'center'}}>
              {image?.uri ? (
                <Image
                  source={image}
                  style={{height: mvs(60), width: mvs(80), borderRadius: 10}}
                />
              ) : (
                <View
                  style={{
                    backgroundColor: '#BD7B10',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    borderRadius: 10,
                  }}>
                  <Plus />
                  <Regular label={'Add image'} size={10} color={colors.white} />
                </View>
              )}
              <Light label={'(Optional)'} size={8} color={'#966E09'} />
            </TouchableOpacity>
            <View style={{paddingBottom: mvs(25)}}>
              <PrimaryInput
                placeHolder="Receiver name"
                value={receiverName}
                onChange={onChangeReceiverName}
                onRightIconClick={() => {}}
                styleTextinput={{borderRadius: 10, padding: 0}}
                style={styles.sender}
                placeholderTextColor={'#00000050'}
              />
            </View>
          </Row>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: mvs(4),
  },
  image: {
    height: mvs(80),
    width: mvs(80),
    borderRadius: mvs(10),
    alignSelf: 'center',
  },
  text: {
    fontFamily: 'Assistant',
  },
  sender: {
    backgroundColor: '#BD7B10',
    width: mvs(200),
    borderRadius: 10,
    height: mvs(33),
    borderColor: '#BD7B10',
    paddingLeft: 0,
  },
});
export default BuyCardComponent;
