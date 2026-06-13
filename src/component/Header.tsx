import React, { useState } from 'react'

import { View, StyleSheet, StatusBar } from 'react-native'

//ASSETS
import { COLORS, FONTS } from '../assets'

//CONSTANT
import { getScaleSize } from '../constant'

//COMPONENT
import Text from './Text'

export default function Header() {
    return (
        <View style={styles.container}>
            <Text                
                size={getScaleSize(26)}
                font={FONTS.Bold}
                color={COLORS._0F0F0F}>
                {'Hello Renzo!'}
            </Text>
            <Text
                style={{}}
                size={getScaleSize(16)}
                font={FONTS.Regular}
                color={COLORS._0F0F0F}>
                {'Are you ready to dance?'}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS._FFF,
        height: getScaleSize(75),
        // marginTop: StatusBar.currentHeight,
        paddingHorizontal:getScaleSize(35),
        paddingVertical:getScaleSize(10)
    }
})