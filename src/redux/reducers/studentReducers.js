import {
    GET_HOCKY_FAIL,
    GET_HOCKY_SUCCESS,
    GET_LICHHOC_FAIL,
    GET_LICHHOC_SUCCESS,
    GET_LIST_KETQUA_FAIL,
    GET_LIST_KETQUA_SUCCESS,
    GET_LIST_MONHOC_FAIL,
    GET_LIST_MONHOC_SUCCESS,
    GET_SINH_VIEN_FAIL,
    GET_SINH_VIEN_SUCCESS,
    GET_TOKEN_FAIL,
    GET_TOKEN_SUCCESS
} from "../actions/studentActions"

const initialState = {
    sinhVien: {},
    listMonHoc: [],
    ketQuaHocTap: [],
    token: "",
    hocKy: [],
    lichHoc: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_SINH_VIEN_SUCCESS:
            return { ...state, sinhVien: payload }
        case GET_SINH_VIEN_FAIL:
            return { ...state }
        case GET_LIST_MONHOC_SUCCESS:
            return { ...state, listMonHoc: payload }
        case GET_LIST_MONHOC_FAIL:
            return { ...state }
        case GET_LIST_KETQUA_SUCCESS:
            return { ...state, ketQuaHocTap: payload }
        case GET_LIST_KETQUA_FAIL:
            return { ...state }
        case GET_TOKEN_SUCCESS:
            return { ...state, token: payload }
        case GET_TOKEN_FAIL:
            return { ...state }
        case GET_HOCKY_SUCCESS:
            return { ...state, hocKy: payload }
        case GET_HOCKY_FAIL:
            return { ...state }
        case GET_LICHHOC_SUCCESS:
            return { ...state, lichHoc: payload }
        case GET_LICHHOC_FAIL:
            return { ...state }
        default:
            return state
    }
}
