import React from 'react';
import {StyleSheet, View} from 'react-native';
import {mvs} from '../../services/metrices';
import colors from '../../services/colors';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-modern-datepicker';
import moment from 'moment';
const DatePickerModal = ({visible = false, onSelect}) => {
  return (
    <Modal backdropOpacity={0.7} visible={visible}>
      <View style={styles.container}>
        <DatePicker
          onSelectedChange={onSelect}
          current={moment().format('yyyy-MM-dd')}
          minimumDate={moment().format('yyyy-MM-dd')}
          maximumDate="2040-06-27"
          mode="calendar"
          minuteInterval={30}
          style={{borderRadius: 10, height: mvs(100)}}
          options={{
            backgroundColor: colors.primary,
            textHeaderColor: colors.white,
            textDefaultColor: colors.white,
            selectedTextColor: colors.white,
            mainColor: colors.red,
            textSecondaryColor: colors.white,
            borderColor: 'rgba(122, 146, 165, 0.1)',
          }}
        />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    height: mvs(100),
    backgroundColor: colors.white,
  },
});
export default DatePickerModal;
