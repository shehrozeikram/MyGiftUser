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
import { colors } from 'react-native-elements';
import Row from '../atoms/row';
import Light from '../../presentation/typography/light-text';
const BuyCardComponent = ({
  title = 'Taco Salad',
  subTitle = '88 Calories',
  image,
  onClick,
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
            padding:mvs(15)
          }}>
          <Row>
            <PrimaryInput
              placeHolder="Sender name"
              value={''}
              onChange={val => {}}
              onRightIconClick={() => {}}
              styleTextinput={{borderRadius:10,padding:0}}
              style={{backgroundColor:'#BD7B10',width:mvs(170),borderRadius:10,height:mvs(33),borderColor:'#BD7B10'}}
              placeholderTextColor={'#00000050'}
            />
            <MyGift2 />
          </Row>
          <PrimaryInput
            placeHolder="Your message....."
            value={''}
            onChange={val => {}}
            numberOfLines={6}
            multiline={true}
            onRightIconClick={() => {}}
            style={{backgroundColor:'#BD7B10',height:mvs(113),borderColor:'#BD7B10'}}
            placeholderTextColor={'#00000050'}
            styleTextinput={{borderRadius:10,paddingTop:10,textAlignVertical: 'top'}}
            lineHeight={23}
          />
          <Row alignItems={'center'} style={{marginTop:mvs(20)}} >
            <View style={{alignItems:'center'}}>
            <View style={{backgroundColor:'#BD7B10',justifyContent:'center',alignItems:'center',padding:10,borderRadius:10}}>
              <Plus />
              <Regular label={'Add image'} size={10}  color={colors.white}/>
            </View>
            <Light label={'(Optional)'} size={8}  color={'#966E09'}/>
            </View>
            <View style={{paddingBottom:mvs(25)}}>
            <PrimaryInput
              placeHolder="Receiver name"
              value={''}
              onChange={val => {}}
              onRightIconClick={() => {}}
              styleTextinput={{borderRadius:10,padding:0}}
              style={{backgroundColor:'#BD7B10',width:mvs(190),borderRadius:10,height:mvs(33),borderColor:'#BD7B10'}}
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
});
export default BuyCardComponent;
