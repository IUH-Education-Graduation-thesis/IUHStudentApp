import findSinhVien from "./findSinhVien";
import login from "./login"
import getProfile from "./getProfile";

const query = {
    ...findSinhVien.query,
    ...getProfile.query
}

const mutation = {
    ...login.mutation,
}

export default {
    query,
    mutation,
};
