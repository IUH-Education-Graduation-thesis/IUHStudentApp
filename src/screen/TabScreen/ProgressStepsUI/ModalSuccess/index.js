import { ScrollView, TouchableOpacity, View } from 'react-native';
import Text from '../../../../components/Text';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

const TYPE = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

const ModalSuccess = ({ data, closeModal, visible }) => {
  const listSinhVienLopHocPhan =
    data?.sinhVienLopHocPhans?.map((item) => ({
      ...item,
      type: TYPE.SUCCESS,
    })) || [];

  const listLopHocPhan =
    data?.lopHocPhanFailures?.map((item) => ({ ...item, type: TYPE.FAILURE })) || [];

  const consumListResult = [...listSinhVienLopHocPhan, ...listLopHocPhan];

  /**
   * Function
   * ===============================================
   */

  const handleCloseModal = () => {
    closeModal();
  };

  /**
   * render view
   * ===========================================================
   */

  const renderLopHocPhan = useMemo(() => {
    return consumListResult?.map((item) => {
      if (item?.type === TYPE.SUCCESS) {
        return (
          <View
            style={{
              backgroundColor: '#B9F8D3',
              borderRadius: 5,
              paddingHorizontal: 15,
              paddingVertical: 10,
              marginTop: 10,
            }}
          >
            <Text>{`LHP: ${item?.lopHocPhan?.tenLopHocPhan}`}</Text>
            <Text>{`Nhóm thức hành: ${item?.nhomThucHanh}`}</Text>
          </View>
        );
      }

      return (
        <View
          style={{
            backgroundColor: '#E78EA9',
            borderRadius: 5,
            paddingHorizontal: 15,
            paddingVertical: 10,
            marginTop: 10,
          }}
        >
          <Text>{`LHP: ${item?.lopHocPhan?.tenLopHocPhan}`}</Text>
          <Text>{`Lý do: ${item?.message}`}</Text>
        </View>
      );
    });
  }, [consumListResult]);

  return (
    <Modal
      style={{ backgroundColor: 'white', borderRadius: 10, overflow: 'hidden' }}
      isVisible={visible}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <View
            style={{
              backgroundColor: '#40DFEF',
              paddingVertical: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Đăng ký học phần</Text>
          </View>
          <ScrollView style={{ marginTop: 10, paddingHorizontal: 10 }}>
            {renderLopHocPhan}
          </ScrollView>
        </View>
        <View style={{ flexDirection: 'row-reverse', padding: 10 }}>
          <TouchableOpacity
            onPress={handleCloseModal}
            style={{ backgroundColor: '#1da1f2', padding: 10, borderRadius: 5 }}
          >
            <Text style={{ color: 'white' }}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalSuccess;

ModalSuccess.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  closeModal: PropTypes.func,
  visible: PropTypes.bool,
};

ModalSuccess.defaultProps = {
  data: {},
  closeModal: () => {},
  visible: false,
};
