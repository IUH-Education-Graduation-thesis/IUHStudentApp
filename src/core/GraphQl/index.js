import getListHocKy from './getListHocKy';
import getHocPhanDaDangKy from './getHocPhanDaDangKy';
import dangKyHocPhan from './dangKyHocPhan';
import findSinhVien from './findSinhVien';
import login from './login';
import getProfile from './getProfile';
import getListHocPhanDKHP from './getListHocPhanDKHP';
import getLichHoc from './getLichHoc';
import getDiem from './getDiem';

const query = {
  ...getListHocPhanDKHP.query,
  ...getLichHoc.query,
  ...getDiem.query,
  ...findSinhVien.query,
  ...getProfile.query,
  ...getListHocKy.query,
  ...getHocPhanDaDangKy.query,
};

const mutation = {
  ...login.mutation,
  ...dangKyHocPhan.mutation,
};

export default {
  query,
  mutation,
};
