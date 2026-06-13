import React, { memo } from 'react'
import { View, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'

//ASSETS
import { COLORS, FONTS, IMAGES } from '../assets'

//CONSTANT
import { getScaleSize } from '../constant'

//COMPONENT
import Text from './Text'

function ItemRow(props: any) {
    const { item } = props
    return (
        <View style={styles.container}>
            <Image style={styles.imageView} source={item?.event_profile_pic ? { uri: item?.event_profile_pic } : 0} />
            <View style={styles.detailesView}>
                <View style={styles.commonRow}>
                    <Text
                        style={{ flex: 1.0 }}
                        size={getScaleSize(16)}
                        numberOfLines={1}
                        font={FONTS.SemiBold}
                        color={COLORS._181A1F}>
                        {item?.event_name}
                    </Text>
                    <Image style={styles.nextImage} source={IMAGES.ic_next} />
                </View>
                <View style={styles.commonRow}>
                    <Text
                        style={{ flex: 1.0 }}
                        size={getScaleSize(12)}
                        numberOfLines={1}
                        font={FONTS.Medium}
                        color={'#34A853'}>
                        {`${item?.readable_from_date} - ${item?.readable_to_date}`}
                    </Text>
                    <Text
                        size={getScaleSize(12)}
                        numberOfLines={1}
                        font={FONTS.Regular}
                        color={'#828282'}>
                        {`${item?.city},${item?.country}`}
                    </Text>
                </View>
                <Text
                    size={getScaleSize(12)}
                    numberOfLines={1}
                    font={FONTS.Regular}
                    color={'#828282'}>
                    {'€12'}
                </Text>
                <View style={{ flexDirection: 'row', marginTop: getScaleSize(3) }}>
                    <View style={{ flex: 1.0 }}>
                        <FlatList
                            data={item?.danceStyles}
                            horizontal
                            keyExtractor={(item: any, index: number) => index.toString()}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.rowContainer}>
                                        <Text
                                            size={getScaleSize(12)}
                                            font={FONTS.Medium}
                                            color={COLORS._181A1F}>                                                
                                            {item?.ds_name}
                                        </Text>
                                    </View>
                                )
                            }}

                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ height: getScaleSize(25), width: 25 }} source={IMAGES.share} />
                        <TouchableOpacity activeOpacity={1}
                            onPress={() => {
                                props?.onPressFavorite()
                            }}>
                            <Image style={{ height: getScaleSize(25), width: 25, marginLeft:getScaleSize(6) }} source={props?.isFavorite ? IMAGES.heart_fill :IMAGES.heart} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: getScaleSize(10),
        paddingVertical: getScaleSize(12),
        backgroundColor: COLORS._FFF,
        borderRadius: getScaleSize(12),
        paddingHorizontal: getScaleSize(10),
        marginTop: getScaleSize(16),
        flexDirection: 'row'
    },
    imageView: {
        height: getScaleSize(80),
        width: getScaleSize(80),
        borderRadius: getScaleSize(4),
        backgroundColor: 'red',
        alignSelf: 'center'
    },
    detailesView: {
        flex: 1.0,
        marginHorizontal: getScaleSize(8),
    },
    commonRow: {
        flexDirection: 'row'
    },
    nextImage: {
        height: getScaleSize(24),
        width: getScaleSize(24),
    },
    rowContainer: {
        backgroundColor: '#F5F7FC',
        paddingVertical: getScaleSize(8),
        paddingHorizontal: getScaleSize(8),
        borderRadius: getScaleSize(25),
        flexDirection: 'row'
    }
})

export default memo(ItemRow)