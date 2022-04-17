import findSinhVien from "./findSinhVien";
import login from "./login"
import getProfile from "./getProfile";
import getListHocPhanDKHP from "./getListHocPhanDKHP";

const query = {
    ...findSinhVien.query,
    ...getProfile.query,
    ...getListHocPhanDKHP.query
}

const mutation = {
    ...login.mutation,
}

export default {
    query,
    mutation,
};
