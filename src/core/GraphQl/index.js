import findSinhVien from './findSinhVien';
import login from './login';
import getProfile from './getProfile';
import getListHocPhanDKHP from './getListHocPhanDKHP';
import getListHocKy from './getListHocKy';
import getHocPhanDaDangKy from './getHocPhanDaDangKy';
import dangKyHocPhan from './dangKyHocPhan';

const query = {
  ...findSinhVien.query,
  ...getProfile.query,
  ...getListHocPhanDKHP.query,
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
