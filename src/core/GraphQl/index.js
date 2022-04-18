import findSinhVien from "./findSinhVien";
import login from "./login"
import getProfile from "./getProfile";
import getListHocPhanDKHP from "./getListHocPhanDKHP";
import getListHocKy from './getListHocKy';


const query = {
    ...findSinhVien.query,
    ...getProfile.query,
    ...getListHocPhanDKHP.query,
    ...getListHocKy.query,
}

const mutation = {
  ...login.mutation,
};

export default {
  query,
  mutation,
};
