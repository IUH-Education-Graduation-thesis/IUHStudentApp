import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { BackgroundView } from '../../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const mockData = [
  {
    id: 1,
    date: '2020/4/23',
    message: 'Đây là nội dung của cái thông báo nó dài vcl ra như thế này nè',
    type: 'LHP',
    isRead: false,
  },
  {
    id: 2,
    date: '2020/4/23',
    message: 'Đây là nội dung của cái thông báo nó dài vcl ra như thế này nè',
    type: 'LHP',
    isRead: false,
  },
  {
    id: 3,
    date: '2020/4/23',
    message: 'Đây là nội dung của cái thông báo nó dài vcl ra như thế này nè',
    type: 'LHP',
    isRead: false,
  },
  {
    id: 4,
    date: '2020/4/23',
    message: 'Đây là nội dung của cái thông báo nó dài vcl ra như thế này nè',
    type: 'LHP',
    isRead: false,
  },
  {
    id: 5,
    date: '2020/4/23',
    message: 'Đây là nội dung của cái thông báo nó dài vcl ra như thế này nè',
    type: 'LHP',
    isRead: false,
  },
  {
    id: 6,
    date: '2020/4/23',
    message: 'Đây là nội dung của cái thông báo nó dài vcl ra như thế này nè',
    type: 'LHP',
    isRead: false,
  },
  {
    id: 7,
    date: '2020/4/23',
    message: 'Đây là nội dung của cái thông báo nó dài vcl ra như thế này nè',
    type: 'LHP',
    isRead: false,
  },
  {
    id: 8,
    date: '2020/4/23',
    message: 'Đây là nội dung của cái thông báo nó dài vcl ra như thế này nè',
    type: 'LHP',
    isRead: false,
  },
  {
    id: 9,
    date: '2020/4/23',
    message: 'Đây là nội dung của cái thông báo nó dài vcl ra như thế này nè',
    type: 'LHP',
    isRead: false,
  },
];

const NotificationScreen = () => {
  const nav = useNavigation();

  /**
   * Render view
   * ========================================
   */

  const handleRenderListItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles?.wrapper?.item}>
        <View style={{ backgroundColor: '#eae4e4', padding: 20, borderRadius: 50 }}>
          <IconFontAwesome size={30} name="group" />
        </View>
        <View style={{ width: 20 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 17, marginBottom: 10, fontWeight: '600' }}>{item?.message}</Text>
          <Text>{item?.date}</Text>
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
              }}
            >
              <Text style={{ fontSize: 10, color: 'white' }}>
                {mockData?.filter((item) => !item?.isRead).length}
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <IconEntypo size={25} name="dots-three-horizontal" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <FlatList data={mockData} renderItem={handleRenderListItem} />
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
      backgroundColor: '#eae4e4',
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
