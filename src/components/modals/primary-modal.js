import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Cross} from '../../assets/svgs';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import Row from '../atoms/row';
const PrimaryModal = ({
  visible = false,
  onLogout,
  onCancel,
  onDelete,
  description = 'Are you sure you want to delete your account?',
  logout = false,
}) => {
  return (
    <Modal backdropOpacity={0.3} isVisible={visible}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onCancel}>
          <Cross />
        </TouchableOpacity>
        <Regular
          numberOfLines={4}
          label={description}
          color={colors.lightgrey1}
          style={styles.text}
          size={18}
        />
        <Row alignItems="center" style={{paddingHorizontal: mvs(26)}}>
          <TouchableOpacity onPress={onCancel}>
            <Bold label={'Cancel'} color={colors.green} size={17} />
          </TouchableOpacity>
          {logout ? (
            <TouchableOpacity onPress={onLogout}>
              <Bold label={'Logout'} color={colors.lightgrey1} size={17} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onDelete}>
              <Bold label={'Delete'} color={colors.lightgrey1} size={17} />
            </TouchableOpacity>
          )}
        </Row>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    ...colors.shadow,
    borderRadius: mvs(15),
    paddingTop: mvs(12),
    paddingHorizontal: mvs(13),
    paddingBottom: mvs(26),
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: mvs(26),
    paddingHorizontal: mvs(23),
  },
});
export default PrimaryModal;
