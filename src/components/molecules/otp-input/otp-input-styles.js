import {StyleSheet} from 'react-native';
import {mvs} from '../../../services/metrices';
import colors from './../../../services/colors';

export const OPTINPUT_STYLES = StyleSheet.create({
  // root: {},
  // title: { textAlign: 'center', fontSize: 30 },
  // // codeFieldRoot: {marginTop: 20},
  // cell: {
  //   width: WP(6),
  //   height: HP(4),
  //   //   lineHeight: 3,
  //   fontSize: fontSize.font20,
  //   fontFamily: 'Poppins-SemiBold',
  //   borderBottomWidth: 2,
  //   borderColor: palette.baseLine,
  //   textAlign: 'center',
  // },
  // focusCell: {
  //   borderColor: palette.blue,
  // },
  root: {},
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  codeFieldRoot: {
    // marginTop: 20,
    // width: 280,
    // marginLeft: 'auto',
    // marginRight: 'auto',
    alignItems: 'center',
  },
  cellRoot: {
    width: mvs(72),
    height: mvs(68),
    // margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.F0F0F0,
    borderWidth: 1,
    borderRadius: mvs(10),
    marginHorizontal: mvs(5),
    ...colors.shadow,
    backgroundColor: '#F0F0F0',
  },
  cellText: {
    color: colors.primary,
    fontSize: mvs(20),
    textAlign: 'center',
  },
  focusCell: {
    borderColor: colors.primary,
    borderBottomWidth: 2,
  },
});
