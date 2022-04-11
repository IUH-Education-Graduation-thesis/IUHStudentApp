import findSinhVien from "./findSinhVien";
import login from "./login"

const query = {
    ...findSinhVien.query,
}

const mutation = {
    ...login.mutation,
}

export default {
    query,
    mutation,
};
