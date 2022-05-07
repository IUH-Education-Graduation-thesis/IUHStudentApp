import { Image, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Text from '../../../../components/Text';
import { IC_ARR_DOWN } from '../../MarkScreen/icons';
import Accordion from 'react-native-collapsible/Accordion';
import { getListMonHocSelectors } from '../../../../redux/selectors/selectorStudents';
import { useSelector } from 'react-redux';
import { RadioButton } from 'react-native-paper';

import ModalLichHoc from './ModalLichHoc';
import { isEmpty } from 'lodash';

const LopHocPhan = (props) => {
  const { data, onChange } = props;

  const idsMonHoc = useSelector(getListMonHocSelectors);
  const [state, setState] = useState({
    lopHocPhan: [],
  });
  const [currentLopHocPhan, setCurrentLopHocPhan] = useState({});
  const [isVisibleModalLichHoc, setIsVisibleModalLichHoc] = useState(false);

  const [checked, setChecked] = useState(data[0].lopHocPhans.maLopHocPhan);

  const [checkedLopHocPhan, setCheckedLopHocPhan] = useState([]);

  const [activeSections, setActiveSections] = useState([]);

  /**
   * Function
   * ==========================================================
   */

  const handleOnPressViewLicHoc = (lhp) => {
    setCurrentLopHocPhan(lhp);
    setIsVisibleModalLichHoc(true);
  };

  const setSections = (sections) => {
    // Setting up a active section state
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const handleClickRadioButton = (hocPhanId, lopHocPhanId) => {
    const _current = checkedLopHocPhan?.map((item) => item?.hocPhanId)?.includes(hocPhanId);

    if (_current) {
      if (checkedLopHocPhan?.map((item) => item?.lopHocPhanId)?.includes(lopHocPhanId)) {
        const _checkedLopHocPhan = checkedLopHocPhan?.filter(
          (item) => item?.hocPhanId !== hocPhanId,
        );

        setCheckedLopHocPhan(_checkedLopHocPhan);

        return;
      }

      const _checkedLopHocPhan = checkedLopHocPhan?.filter((item) => item?.hocPhanId !== hocPhanId);

      const _temp = {
        hocPhanId: hocPhanId,
        lopHocPhanId: lopHocPhanId,
      };

      setCheckedLopHocPhan([..._checkedLopHocPhan, _temp]);
      return;
    }

    const _temp = {
      hocPhanId: hocPhanId,
      lopHocPhanId: lopHocPhanId,
    };

    setCheckedLopHocPhan([...checkedLopHocPhan, _temp]);
  };

  /**
   * UseEffect
   * ==============================================================
   */

  useEffect(() => {
    if (isEmpty(checkedLopHocPhan)) return;
    const _listLopHocPhanSelected = checkedLopHocPhan?.map((item) => item?.lopHocPhanId);
    const _data = data
      ?.map((item) =>
        item?.lopHocPhans?.filter((_item) => _listLopHocPhanSelected?.includes(_item?.id))?.flat(),
      )
      ?.flat();

    onChange(_data);
  }, [checkedLopHocPhan, data]);

  useEffect(() => {
    if (idsMonHoc != null) {
      data.map((item, index) => {
        idsMonHoc.map((id) => {
          if (id === item.maHocPhan) {
            setState({
              lopHocPhan: [...state.lopHocPhan, item],
            });
          }
        });
      });
    }
  }, [data]);

  /**
   * Render view
   * ==========================================================================
   */

  const _renderHeader = (section) => {
    return (
      <View key={section.id} style={styles.item}>
        <Text style={styles.title}>{section.monHoc.ten}</Text>
        <Image source={IC_ARR_DOWN} />
      </View>
    );
  };

  const _renderContent = (item) => {
    const { lopHocPhans } = item;
    return lopHocPhans.map((lhp) => {
      return (
        <View>
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              marginHorizontal: 20,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <RadioButton
              value={lhp.maLopHocPhan}
              status={
                checkedLopHocPhan?.map((item) => item?.lopHocPhanId)?.includes(lhp?.id)
                  ? 'checked'
                  : 'unchecked'
              }
              onPress={() => handleClickRadioButton(item?.id, lhp?.id)}
            />
            <View>
              <Text style={styles.txtRenderChonMH}>Mã LHP: {lhp?.maLopHocPhan}</Text>
              <Text>Tên LHP: {item?.monHoc?.ten}</Text>
              <Text>Lớp dự kiến: {lhp?.lopDuKien}</Text>
              <Text>Sĩ số tối đa: {lhp?.soLuongToiDa}</Text>
              <Text>Dã đăng ký: {lhp?.soLuongHienTai}</Text>
              <Text>Trạng thái: {lhp?.trangThaiLopHocPhan}</Text>
              <TouchableOpacity
                onPress={() => handleOnPressViewLicHoc(lhp)}
                style={{
                  backgroundColor: '#1da1f2',
                  paddingVertical: 10,
                  paddingLeft: 10,
                  marginTop: 10,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: 'white' }}>Xem lịch học</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    });
  };

  return (
    <>
      <ScrollView>
        <Accordion
          sections={data}
          keyExtractory={(item, index) => index}
          activeSections={activeSections}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={setSections}
        />
      </ScrollView>
      <ModalLichHoc
        onClose={() => setIsVisibleModalLichHoc(false)}
        isVisible={isVisibleModalLichHoc}
        data={currentLopHocPhan}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
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
    backgroundColor: 'lightblue',
    paddingBottom: 20,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 20,
  },
  headerView: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#4baef9',
  },
  contentView: {
    flex: 1.4,
  },
  textHeader: {
    fontSize: 30,
    color: 'white',
    fontWeight: '600',
  },
  subtitle1: {
    fontSize: 20,
    fontWeight: '500',
    height: 40,
    backgroundColor: '#bff006',
    marginBottom: 10,
  },
});

export default LopHocPhan;
