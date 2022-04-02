export const GET_SINH_VIEN_SUCCESS = "GET_SINH_VIEN_SUCCESS"
export const GET_SINH_VIEN_FAIL = "GET_SINH_VIEN_FAIL"
export const GET_LIST_MONHOC_SUCCESS = "GET_LIST_MONHOC_SUCCESS"
export const GET_LIST_MONHOC_FAIL = "GET_LIST_MONHOC_FAIL"
export const GET_LIST_KETQUA_SUCCESS = "GET_LIST_KETQUA_SUCCESS"
export const GET_LIST_KETQUA_FAIL = "GET_LIST_KETQUA_FAIL"
export const GET_TOKEN_SUCCESS = "GET_TOKEN_SUCCESS"
export const GET_TOKEN_FAIL = "GET_TOKEN_FAIL"
export const GET_HOCKY_SUCCESS = "GET_HOCKY_SUCCESS"
export const GET_HOCKY_FAIL = "GET_HOCKY_FAIL"
export const GET_LICHHOC_SUCCESS = "GET_LICHHOC_SUCCESS"
export const GET_LICHHOC_FAIL = "GET_LICHHOC_FAIL"

export const getSinhVienSuccess = (sinhVien) => ({
    type: GET_SINH_VIEN_SUCCESS,
    payload: sinhVien,
})
export const getSinhVienFail = () => ({
    type: GET_SINH_VIEN_FAIL,
})
export const getListMonHocSuccess = (listMonHoc) => ({
    type: GET_LIST_MONHOC_SUCCESS,
    payload: listMonHoc,
})
export const getListMonHocFail = () => ({
    type: GET_LIST_MONHOC_FAIL,
})
export const getListKetQuaSuccess = (listKetQua) => ({
    type: GET_LIST_KETQUA_SUCCESS,
    payload: listKetQua,
})
export const getListKetQuaFail = () => ({
    type: GET_LIST_KETQUA_FAIL,
})
export const getTokenSuccess = (token) => ({
    type: GET_TOKEN_SUCCESS,
    payload: token,
})
export const getTokenFail = () => ({
    type: GET_TOKEN_FAIL,
})
export const getHocKySuccess = (listHocKy) => ({
    type: GET_HOCKY_SUCCESS,
    payload: listHocKy,
})
export const getHocKyFail = () => ({
    type: GET_HOCKY_FAIL,
})
export const getListLicHocSuccess = (listLichHoc) => ({
    type: GET_LICHHOC_SUCCESS,
    payload: listLichHoc,
})
export const getListLicHocFail = () => ({
    type: GET_LICHHOC_FAIL,
})