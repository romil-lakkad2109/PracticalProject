import React, { useContext, useEffect, useRef } from 'react';
import { Alert, AppState, Linking, PermissionsAndroid, Platform, StatusBar, View } from 'react-native';

//COMPONENTS
import { Tabbar } from '../component';

//SCREENS
import { SCREENS, TABS } from '.';

//PACKAGES
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

function BottomBar(props: any) {

    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName={TABS.search.identifier}
                tabBar={props => {
                    return <Tabbar {...props} />;
                }}>
                <Tab.Screen
                    name={TABS.search.identifier}
                    component={TABS.search.component}

                />
                <Tab.Screen
                    name={TABS.Events.identifier}
                    component={TABS.Events.component}
                />
                <Tab.Screen
                    name={TABS.Favourites.identifier}
                    component={TABS.Favourites.component}
                />
                <Tab.Screen
                    name={TABS.Profile.identifier}
                    component={TABS.Profile.component}
                />
            </Tab.Navigator>
        </>
    );

}

export default BottomBar;
