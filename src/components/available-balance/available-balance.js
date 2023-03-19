import React from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
const AvailableBalance = ({
  style,
  bgColor = colors.primary,
  balance = 350.79,
  ...props
}) => {
  return (
    <View style={{...styles.container, backgroundColor: bgColor, ...style}}>
      <Regular
        label={'Available Balance'}
        size={14}
        color={bgColor == colors.primary ? colors.white : colors.primary}
      />
      <Bold
        label={balance?.toFixed(2) + ' SAR'}
        size={20}
        color={bgColor == colors.primary ? colors.white : colors.primary}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: mvs(12),
    borderRadius: mvs(10),
    backgroundColor: colors.primary,
    ...colors.shadow,
  },
});
const mapStateToProps = store => ({
  wallet: store.state.wallet,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(AvailableBalance);
