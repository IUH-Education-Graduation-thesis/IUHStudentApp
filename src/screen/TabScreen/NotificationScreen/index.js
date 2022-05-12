import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { BackgroundView } from '../../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import moment from 'moment';
import queries from '../../../core/GraphQl';
import { useMutation } from '@apollo/client';
import { screenName } from '../../../utils/constantScreenName';

const suaNotificationMutation = queries.mutation.suaNotification('id');

const NotificationScreen = () => {
  const nav = useNavigation();

  const { listNotification } = useContext(GlobalContext);

  const totalNotificationUnread = listNotification?.filter((item) => !item?.isRead)?.length;

  /**
   * API
   * ======================================================
   */

  const [actSuaNotification] = useMutation(suaNotificationMutation);

  /**
   * Function
   * ==========================================================
   */

  const handlePressNotificationItem = (notification) => {
    if (notification?.type == 'LH') {
      nav.navigate(screenName.calendar);
    } else {
      nav.navigate(screenName.dkhp);
    }

    if (notification?.isRead) return;

    actSuaNotification({
      variables: {
        id: notification?.id,
        isRead: true,
      },
    });
  };

  /**
   * Render view
   * ========================================
   */

  const handleRenderListItem = ({ item }) => {
    const _createDate = moment(item?.createDate)?.format('hh:mm DD/MM/YYYY');

    return (
      <TouchableOpacity
        onPress={() => handlePressNotificationItem(item)}
        style={{ ...styles?.wrapper?.item, backgroundColor: !item?.isRead ? '#EEF3D2' : 'white' }}
      >
        <View style={{ backgroundColor: '#B689C0', padding: 20, borderRadius: 50 }}>
          <IconFontAwesome size={30} name="group" />
        </View>
        <View style={{ width: 20 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 17, marginBottom: 10, fontWeight: '600' }}>{item?.message}</Text>
          <Text>{_createDate}</Text>
        </View>
        <View style={{ width: 10 }} />
        <TouchableOpacity style={{ padding: 10 }}>
          <IconEntypo name="dots-three-horizontal" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <BackgroundView>
      <View style={styles?.wrapper}>
        <View style={styles?.wrapper?.wrap_head}>
          <TouchableOpacity onPress={() => nav.goBack()}>
            <Icon size={25} name="arrowleft" />
          </TouchableOpacity>
          <View style={{ position: 'relative' }}>
            <Text style={styles?.wrapper?.wrap_head?.title}>Thông báo</Text>
            <View
              style={{
                backgroundColor: 'red',
                position: 'absolute',
                left: -20,
                top: -10,
                width: 20,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                display: totalNotificationUnread <= 0 ? 'none' : 'flex',
              }}
            >
              <Text style={{ fontSize: 10, color: 'white' }}>{totalNotificationUnread}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <IconEntypo size={25} name="dots-three-horizontal" />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ backgroundColor: 'white' }}>
          <FlatList data={listNotification} renderItem={handleRenderListItem} />
        </ScrollView>
      </View>
    </BackgroundView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,

    wrap_head: {
      paddingHorizontal: 20,
      height: 60,
      backgroundColor: '#947EC3',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      title: { fontSize: 20, fontWeight: 'bold' },
    },

    item: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      alignItems: 'center',
      borderColor: 'grey',
    },
  },
});

export default NotificationScreen;
