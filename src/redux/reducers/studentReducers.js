import {
    GET_SINH_VIEN_FAIL,
    GET_SINH_VIEN_SUCCESS,
    SET_HOCKY_ID,
    SET_MONHOC_ID,
} from "../actions/studentActions"

const initialState = {
    sinhVien: {},
    idHocKy: "",
    idMonHoc: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_SINH_VIEN_SUCCESS:
            return { ...state, sinhVien: payload }
        case GET_SINH_VIEN_FAIL:
            return { ...state }
        case SET_HOCKY_ID:
            return { ...state, idHocKy: payload }
        case SET_MONHOC_ID:
            return { ...state, idMonHoc: payload }
        default:
            return state
    }
}
