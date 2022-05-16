import getListHocKy from './getListHocKy';
import getHocPhanDaDangKy from './getHocPhanDaDangKy';
import dangKyHocPhan from './dangKyHocPhan';
import findSinhVien from './findSinhVien';
import login from './login';
import getProfile from './getProfile';
import getListHocPhanDKHP from './getListHocPhanDKHP';
import getLichHoc from './getLichHoc';
import getDiem from './getDiem';
import getNotification from './getNotification';
import suaNotification from './suaNotification';
import checkLichTrung from './checkLichTrung';
import getChuongTrinhKhung from './getChuongTrinhKhung';

const query = {
  ...getListHocPhanDKHP.query,
  ...getLichHoc.query,
  ...getDiem.query,
  ...findSinhVien.query,
  ...getProfile.query,
  ...getListHocKy.query,
  ...getHocPhanDaDangKy.query,
  ...getChuongTrinhKhung.query,
};

const mutation = {
  ...login.mutation,
  ...dangKyHocPhan.mutation,
  ...suaNotification.mutation,
  ...checkLichTrung.mutation,
};

const subscription = {
  ...getNotification.subscription,
};

export default {
  query,
  mutation,
  subscription,
};
