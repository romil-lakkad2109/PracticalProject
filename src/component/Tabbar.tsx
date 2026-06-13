import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

// CONSTANT & ASSETS
import { getScaleSize } from '../constant';
import { FONTS, IMAGES, COLORS } from '../assets';

// COMPONENT
import Text from './Text';

const SCREEN_WIDTH = Dimensions.get('window').width;
const TABBAR_RATIO = getScaleSize(90) / getScaleSize(428);
const TABBAR_HEIGHT = SCREEN_WIDTH * TABBAR_RATIO;

const names = ['Search', 'Events', 'Favourites', 'Profile'];

const images = [
  IMAGES.search,
  IMAGES.calender,
  IMAGES.heart,
  IMAGES.user,
];

function Tabbar(props: any) {
  return (
    <View
      style={[
        styles.mainView,
        {
          height: TABBAR_HEIGHT,
        },
      ]}>
      <View style={styles.tabContainer}>
        {props.state.routes.map((route: any, index: number) => {
          const isFocused = props.state.index === index;

          return (
            <Item
              key={route.key}
              index={index}
              selected={isFocused}
              image={images[index]}
              name={names[index]}
              onPress={() => props.navigation.navigate(route.name)}
            />
          );
        })}
      </View>
    </View>
  );
}

const Item = ({
  image,
  name,
  selected,
  onPress,
}: {
  image: any;
  name: string;
  selected: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.itemContainer}>
      <View style={{ alignSelf: 'center' }}>
        <Image
          style={
            selected
              ? styles.itemImageSelected
              : styles.itemImage
          }
          resizeMode="contain"
          source={image}
        />

        <Text
          style={{ marginTop: getScaleSize(8) }}
          size={getScaleSize(14)}
          font={FONTS.Regular}
          color={selected ? 'green' : COLORS._000}
          align="center">
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS._FFF,
    borderTopLeftRadius: getScaleSize(20),
    borderTopRightRadius: getScaleSize(20),
    overflow: 'hidden',
  },

  mainView: {
    width: SCREEN_WIDTH,
    backgroundColor: COLORS._FFF,
  },

  tabContainer: {
    flexDirection: 'row',
    height: TABBAR_HEIGHT - getScaleSize(20),
    alignItems: 'center',
  },

  tabContainerServiceProvider: {
    flexDirection: 'row',
    height: TABBAR_HEIGHT + getScaleSize(20),
    alignItems: 'center',
    paddingBottom: getScaleSize(6),
  },

  itemContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: getScaleSize(10),
  },

  itemImageSelected: {
    width: getScaleSize(32),
    height: getScaleSize(32),
    alignSelf: 'center',
    tintColor:'green'
  },

  itemImage: {
    width: getScaleSize(32),
    height: getScaleSize(32),
    alignSelf: 'center',
    opacity: 0.7,
  },

  tabText: {
    marginTop: getScaleSize(7),
  },
});

export default Tabbar;