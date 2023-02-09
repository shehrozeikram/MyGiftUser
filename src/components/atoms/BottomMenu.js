//core
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {mvs} from '../../services/metrices';
import Regular from '../../presentation/typography/regular-text';
const BottomMenu = ({colors, ...props}) => {
  const {
    state: {index, routes},
    navigation,
    descriptors,
    style,
  } = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: mvs(39),
        //paddingTop: mvs(10),
        //paddingBottom: mvs(10),
        backgroundColor: colors.background,
        alignItems: 'center',
        ...style,
      }}>
      {routes.map((route, idx) => {
        const {options} = descriptors[route.key];

        const isFocused = index === idx;

        const icon =
          options.tabBarIcon !== undefined
            ? options.tabBarIcon(isFocused, 'white', 10)
            : null;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={1}
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              // flex: 1,
              backgroundColor: `transparent`,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={styles.customIcon}>
              {icon}
              <Regular
                // label={route.name}
                label={''}
                style={{
                  fontSize: mvs(10),
                  color: colors.headerTitle,
                  color: isFocused ? colors.white : colors.lightgrey1,
                  textAlign: 'center',
                }}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  customIcon: {
    height: mvs(65),
    // width: mvs(83),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomMenu;
