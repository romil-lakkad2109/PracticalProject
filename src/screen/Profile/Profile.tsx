import { View, Text } from 'react-native'
import React from 'react'

//CONSTANT
import { Storage } from '../../constant';

//PACKAGES
import { CommonActions } from '@react-navigation/native';

//SCREENS
import SCREENS from '..';

export default function Profile(props: any) {
  return (
    <View style={{justifyContent:'center', flex:1.0, alignItems:'center'}}>
      <Text onPress={()=>{
        Storage.clear();
         props?.navigation?.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: SCREENS.Login.identifier }],
                  }),
                );
      }}>LogOut</Text>
    </View>
  )
}