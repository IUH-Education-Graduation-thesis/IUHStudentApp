import { getSinhVienFail, getSinhVienSuccess } from "../actions/studentActions";

export const getRequestSinhVien = () => {
    return async dispatch => {
        try {
            // const res = await getSinhVien();
            dispatch(getSinhVienSuccess(res?.data?.content));
        }
        catch (error) {
            console.log(error);
            dispatch(getSinhVienFail());
        }
    }
}