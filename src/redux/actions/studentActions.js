export const GET_SINH_VIEN_SUCCESS = "GET_SINH_VIEN_SUCCESS"
export const GET_SINH_VIEN_FAIL = "GET_SINH_VIEN_FAIL"

export const SET_HOCKY_ID = 'SET_HOCKY_ID'
export const SET_MONHOC_ID = 'SET_MONHOC_ID'

export const SET_DAY = 'SET_DAY'

export const getSinhVienSuccess = (sinhVien) => ({
    type: GET_SINH_VIEN_SUCCESS,
    payload: sinhVien,
})
export const getSinhVienFail = () => ({
    type: GET_SINH_VIEN_FAIL,
})

export const setHocKyID = (idHocKy) => ({
    type: SET_HOCKY_ID,
    payload: idHocKy,
})
export const setMonHocID = (idMonHoc) => ({
    type: SET_MONHOC_ID,
    payload: idMonHoc,
})
export const setDay = (date) => ({
    type: SET_DAY,
    payload: date,
})

