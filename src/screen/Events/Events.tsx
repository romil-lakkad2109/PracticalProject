import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

//ASSETS
import { COLORS } from '../../assets';

//API
import { API } from '../../api';

//COMPONENT
import { Header, ItemRow } from '../../component';

//CONSTANT
import { getScaleSize, SHOW_TOAST } from '../../constant';

//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/favouriteSlice';

//PACKAGES
import { FlatList } from 'react-native-gesture-handler';

export default function Events() {
  const [isLoading, setLoading] = useState(false);
  const [eventList, setEventList] = useState([]);

  const dispatch = useDispatch();

  // ✅ SAFE SELECTOR (FIXED ERROR)
  const favorites = useSelector(
    state => state?.favorites?.favorites ?? [],
  );

  useEffect(() => {
    getEventList();
  }, []);

  async function getEventList() {
    try {
      setLoading(true);

      const result = await API.Instance.post(
        API.API_ROUTES.getEventList,
      );

      if (result.status) {
        setEventList(result?.data?.data?.events);
      } else {
        SHOW_TOAST(result?.data?.message ?? '', 'error');
      }
    } catch (error) {
      SHOW_TOAST(error?.message ?? '', 'error');
    } finally {
      setLoading(false);
    }
  }

  // ✅ SAFE FAVORITE CHECK
  const isFavorite = eventId =>
    (favorites ?? []).some(
      item => item.event_date_id === eventId,
    );

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLORS._FFF}
        barStyle="dark-content"
      />

      <Header />

      {isLoading ? (
        <ActivityIndicator
          style={{
            alignSelf: 'center',
            marginTop: getScaleSize(10),
          }}
          size="small"
          color={COLORS._000}
        />
      ) : (
        <FlatList
          data={eventList}
          keyExtractor={(item, index) =>
            index.toString()
          }
          renderItem={({ item }) => (
            <ItemRow
              item={item}
              isFavorite={isFavorite(
                item.event_date_id,
              )}
              onPressFavorite={() =>
                dispatch(toggleFavorite(item))
              }
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS._F2F2F2,
    flex: 1,
  },
});