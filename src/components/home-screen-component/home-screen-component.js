import React from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {IP} from '../../store/api-urls';
import Bold from '../../presentation/typography/bold-text';
import {mvs} from '../../services/metrices';
import {useNavigation} from '@react-navigation/native';
const HomeScreenComponent = ({list = []}) => {
  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <FlatList
        style={{marginTop: mvs(15)}}
        data={list}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={index}
            style={styles.container}
            onPress={() => navigation.navigate('BuyCard')}>
            <ImageBackground
              source={{uri: IP + item?.attachments[0]?.url}}
              blurRadius={2}
              resizeMode="stretch"
              style={styles.card}>
              <Bold label={item?.price + ' SAR'} color={'#966E09'} size={40} />
              <Bold label={item?.title} color={'#966E09'} size={25} />
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
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
  card: {
    height: mvs(200),
    borderRadius: 18,
    borderWidth: 3,
    borderColor: '#EDB82D',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default HomeScreenComponent;
