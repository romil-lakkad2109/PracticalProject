import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';

//ASSTES
import {COLORS, FONTS} from '../assets';

//CONSTANTS
import { getScaleSize } from '../constant';

//PACKAGES
import {SafeAreaView} from 'react-native-safe-area-context';

const Splash = ({navigation}: any) => {
  
  const [showStartAnimation, setShowStartAnimation] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowStartAnimation(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <></>
    // <ImageBackground source={IMAGES.BGSplash} style={styles.container}>
    //   <SafeAreaView edges={['top']} />
    //   <View style={styles.content}>
    //     <View style={styles.startMediaContainer}>
    //       {showStartAnimation ? (
    //         <FastImage
    //           source={IMAGES.StartAnimation}
    //           style={styles.startAnimationMedia}
    //           resizeMode={FastImage.resizeMode.contain}
    //         />
    //       ) : (
    //         <Image
    //           source={IMAGES.Startscreen}
    //           style={styles.startScreenMedia}
    //           resizeMode="cover"
    //         />
    //       )}
    //     </View>
    //     <Image
    //       source={IMAGES.main_splash_header}
    //       style={styles.splash_header}
    //     />
    //     <Text
    //       align="center"
    //       size={getScaleSize(48)}
    //       font={FONTS.SemiBold}
    //       color={COLORS._FFF}>
    //       {t(STRING.find_your)}
    //     </Text>
    //     <Text
    //       align="center"
    //       size={getScaleSize(48)}
    //       font={FONTS.SemiBold}
    //       color={COLORS._FFB2D0}>
    //       {t(STRING.perfect)}{' '}
    //       <Text
    //         size={getScaleSize(48)}
    //         font={FONTS.SemiBold}
    //         color={COLORS._FFF}>
    //         {t(STRING.match)}
    //       </Text>
    //     </Text>
    //     <Text
    //       align="center"
    //       size={getScaleSize(16)}
    //       font={FONTS.Medium}
    //       color={COLORS._F5F5F5}
    //       style={{marginTop: getScaleSize(16)}}>
    //       {t(STRING.discoverNewConnections)}
    //     </Text>
    //   </View>
    //   <SwipeButton
    //     style={styles.swipeButton}
    //     label={t(STRING.getStarted)}
    //     onSwipeComplete={async () => {
    //       await getOnboardingStatus();
    //     }}
    //   />
    //   <SafeAreaView edges={['bottom']} />
    // </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    paddingHorizontal: getScaleSize(24),
  },
  logo: {
    width: getScaleSize(158),
    height: getScaleSize(50),
    marginBottom: getScaleSize(26),
    resizeMode: 'contain',
  },
  splash_header: {
    width: '100%',
    height: getScaleSize(294),
    resizeMode: 'contain',
    marginTop: getScaleSize(-60),
  },
  startMediaContainer: {
    width: '100%',
    height: getScaleSize(255),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: -getScaleSize(50),
  },
  startAnimationMedia: {
    width: '100%',
    height: '100%',
  },
  startScreenMedia: {
    width: '100%',
    height: '100%',
    // transform: [{ scale: 1.6 }, { translateY: -getScaleSize(28) }],
  },
  swipeButton: {
    alignSelf: 'center',
    marginTop: getScaleSize(24),
    marginBottom: getScaleSize(40),
    width: '85%',
  },
});
