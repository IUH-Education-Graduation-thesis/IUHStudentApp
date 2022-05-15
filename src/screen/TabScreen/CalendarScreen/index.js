import { View, StyleSheet, ScrollView, Image } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import { useLazyQuery } from '@apollo/client';
import { isEmpty } from 'lodash';
import BackgroundView from '../../../components/BackgroundView';
import Button from './components/Button';
import { IC_ARR_DOWN, IC_ARR_UP } from '../MarkScreen/icons';
import queries from '../../../core/GraphQl';
import { GETLICHHOC } from './fragment';
import Text from '../../../components/Text';
import ShowCalendar from './components/ShowCalendar';
import { COLORS } from '../../../themes/color';

const getLichHocQuery = queries.query.getLichHoc(GETLICHHOC);
function CalendarScreen() {
  /**
   * Const
   */
  const [activeSections, setActiveSections] = useState([]);
  const today = new Date();

  /**
   * use State/Selector/...
   */
  const [date, setDate] = useState(today);

  /**
   * call query/ mutation
   */
  const [actGetLichHoc, { data: getdataLichHoc, loading: loadingLichHoc }] = useLazyQuery(
    getLichHocQuery,
    {
      fetchPolicy: 'network-only',
    },
  );

  const dataLichHoc = getdataLichHoc?.getLichHoc?.data || [];

  /**
   * useEffect
   * ======================================================
   */

  /**
   * call api get lich hoc when date change
   */
  useEffect(() => {
    if (!date) return;

    const _dateIsoString = date?.toISOString();

    actGetLichHoc({
      variables: {
        ngay: _dateIsoString,
      },
    });
  }, [date, actGetLichHoc]);

  useEffect(() => {
    if (isEmpty(dataLichHoc)) {
      return;
    }

    const _index = dataLichHoc?.map((item, index) => index);

    setActiveSections(_index);
  }, [dataLichHoc, setActiveSections]);

  /**
   *
   * function
   * =========================================================
   */

  const _updateSections = (ids) => {
    setActiveSections(ids);
  };

  const onPress = (type) => {
    if (type == 'pre') {
      const yesterday = new Date(date);
      yesterday.setDate(yesterday.getDate() - 7);
      setDate(yesterday);
    } else if (type == 'now') {
      const now = new Date(today);
      now.setDate(now.getDate());
      setDate(now);
    } else {
      const next = new Date(date);
      next.setDate(next.getDate() + 7);
      setDate(next);
    }
  };

  const handeOnDateChange = (dateRes) => {
    if (!dateRes) return;

    setDate(dateRes);
  };

  /**
   * render ui
   */
  const _renderHeader = (section, index, isActive) => {
    return (
      <View key={section} style={styles.item}>
        <Text style={styles.title}>{section.thu}</Text>
        <Image source={isActive ? IC_ARR_DOWN : IC_ARR_UP} />
      </View>
    );
  };

  const _renderContent = (section) =>
    section.listLichHoc.map((item, index) => {
      if (!isEmpty(item?.lopHocPhan)) {
        return (
          <View
            key={`view_${index}`}
            style={[
              styles.viewContentAccordion,
              { backgroundColor: item?.isLichThi ? '#f3d27a' : 'white' },
            ]}
          >
            <Text style={styles.textTitle}>{item?.lopHocPhan?.tenLopHocPhan}</Text>
            <Text>{`${item?.lopHocPhan?.maLopHocPhan} - ${item?.lopHocPhan?.tenLopHocPhan}`}</Text>
            <Text style={styles.subtitle1}>
              {`Tiết: ${item?.tietHocBatDau}-${item?.tietHocKetThuc}`}
            </Text>
            <Text style={styles.subtitle1}>{`Phòng: ${item?.phongHoc?.tenPhongHoc}`}</Text>
            <Text style={styles.subtitle1}>
              {`Giảng viên: ${item?.lopHocPhan?.giangViens[0]?.hoTenDem ? item?.lopHocPhan?.giangViens[0]?.hoTenDem : "Giáo viên tạm"} ${item?.lopHocPhan?.giangViens[0]?.ten ? item?.lopHocPhan?.giangViens[0]?.ten : ""}`}
            </Text>
            <Text style={styles.subtitle1}>{'Ghi chú: '}</Text>
          </View>
        );
      }

      return <View style={{ width: '100%', height: 30, backgroundColor: 'white' }} />;
    });

  const renderListLichHoc = useMemo(() => {
    if (loadingLichHoc) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    if (isEmpty(dataLichHoc)) {
      return (
        <View>
          <Text>No data!</Text>
        </View>
      );
    }

    return (
      <Accordion
        sections={dataLichHoc}
        keyExtractory={(item, index) => index}
        activeSections={activeSections}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
      />
    );
  }, [loadingLichHoc, dataLichHoc, activeSections, _renderHeader, _renderContent, _updateSections]);

  return (
    <BackgroundView>
      <View style={styles.header}>
        <View>
          <View style={styles.headerView}>
            <Text style={styles.textHeader}>Lịch theo tuần</Text>
          </View>
          <View style={styles.viewHeader}>
            <ShowCalendar day={date} onDateChange={handeOnDateChange} />
            <Button textBtn="< Trở về" onPress={() => onPress('pre')} />
            <Button textBtn="Hiện tại" onPress={() => onPress('now')} />
            <Button textBtn="Tiếp >" onPress={() => onPress('next')} />
          </View>

          <ScrollView>{renderListLichHoc}</ScrollView>
        </View>
      </View>
    </BackgroundView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#f3d27a',
  },
  styleDropItem: {
    marginTop: 10,
    backgroundColor: 'white',
    paddingLeft: 20,
    marginHorizontal: 10,
  },
  header: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    height: 60,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subitem: {
    paddingBottom: 20,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerView: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#4baef9',
    marginBottom: 5,
  },
  title: {
    fontSize: 15,
    color: 'black',
  },
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textHeader: {
    fontSize: 30,
    color: 'white',
    fontWeight: '600',
  },
  viewContentAccordion: {
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 4,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginHorizontal: 10,
    paddingVertical: 10,
  },
});
export default CalendarScreen;
