import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {RightCaret} from '../../assets/svgs/index';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import Row from '../atoms/row';
const ProfileItem = ({title = '', onClick}) => {
  return (
    <TouchableOpacity onPress={onClick} style={styles.container}>
      <Row style={styles.border} alignItems="center">
        <Regular
          size={mvs(18)}
          label={title}
          color={colors.darkGray}
          numberOfLines={2}
        />
        <TouchableOpacity onPress={onClick}>
          <RightCaret />
        </TouchableOpacity>
      </Row>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: mvs(25),
    marginHorizontal: mvs(36),
  },
  border: {
    borderBottomColor: colors.DDDDDD,
    borderBottomWidth: mvs(1),
    paddingBottom: mvs(9),
  },
});
export default ProfileItem;
