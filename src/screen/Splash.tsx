import React, { useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, StyleSheet, View, Animated, TouchableWithoutFeedback } from 'react-native';

//ASSTES
import { COLORS, FONTS, IMAGES } from '../assets';

//CONSTANTS
import { getScaleSize, Storage } from '../constant';

//PACKAGES
import { CommonActions } from '@react-navigation/native';

//SCREENS
import SCREENS from '.';

const Splash = (props: any) => {

  useEffect(() => {
    getDatails()
  }, [])

  async function getDatails() {
    const userDetails = await Storage.get(Storage.USER_DETAILS);
    const userData = JSON.parse(userDetails ?? '{}');

    if (userData && userData?.user) {
      setTimeout(() => {
        props?.navigation?.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: SCREENS.BottomBar.identifier }],
          }),
        );
      }, 2000);
    }
    else {
      setTimeout(() => {
        props?.navigation?.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: SCREENS.Login.identifier }],
          }),
        );
      }, 2000);
    }
  }



  return (
    <View style={styles.container}>
      <Image style={styles.imgLogo} source={IMAGES.splash_icon} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS._FFF,
    justifyContent: 'center',
  },
  imgLogo: {
    height: getScaleSize(56),
    width: getScaleSize(56),
    alignSelf: 'center'
  }
});
