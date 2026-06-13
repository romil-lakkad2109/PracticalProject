import React from 'react';
import { View, FlatList, StatusBar } from 'react-native';

//ASSETS
import { COLORS, FONTS } from '../../assets';

//COMPONENT
import { Header, ItemRow, Text } from '../../component';

//CONSTANT
import { getScaleSize } from '../../constant';

//REDUX
import { useSelector , useDispatch} from 'react-redux';
import { toggleFavorite } from '../../redux/favouriteSlice';

export default function Favorites() {

  const dispatch = useDispatch();

  const favorites = useSelector(
    state => state?.favorites?.favorites ?? [],
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>

      <StatusBar
        backgroundColor={COLORS._FFF}
        barStyle="dark-content"
      />
      <Header />
      <FlatList
        data={favorites}
        keyExtractor={item =>
          item.event_id.toString()
        }
        renderItem={({ item }) => (
          <ItemRow
            item={item}
            isFavorite={true}
            onPressFavorite={() => { 
               dispatch(toggleFavorite(item))
            }}
          />
        )}
        ListEmptyComponent={
          <Text
            style={{ marginHorizontal: getScaleSize(10), alignSelf:'center', marginTop:getScaleSize(56) }}
            size={getScaleSize(18)}
            font={FONTS.Medium}
            color={COLORS._000}>
            {'No favourites found'}
          </Text>
        }
      />
    </View>
  );
}