export const GETPROFILESINHVIEN = `
    id
    userName
    roles
    sinhVien{
        id
        hoTenDem
        ten
        lop{
          id
          ten
          khoa{
            id
            khoa
            hocKies{
              id
              thuTu
            }
          }
        }
    }
`;
export default {};

export const GET_LIST_HOC_KY_FRAGMENT = `
id
thuTuHocKy
namHoc {
  id
  namBatDau
  namKetThuc
}
`;

export const GET_LOP_HOC_PHAN_DA_DANG_KY = `
id
maLopHocPhan
tenLopHocPhan
hocPhan {
  batBuoc
  monHoc {
    id
    ten
  }
}
tenLopHocPhan
soLuongToiDa
soNhomThucHanh
trangThaiLopHocPhan
giangViens {
  id
  hoTenDem
  ten
}
soLuongHienTai
lopDuKien
lichHocs {
  id
  ngayHocTrongTuan
  nhomThucHanh
  thoiGianBatDau
  thoiGianKetThuc
  tietHocBatDau
  tietHocKetThuc
  phongHoc {
    id
    tenPhongHoc
    dayNha {
      id
      tenDayNha
    }
  }
  isLyThuyet
  isLichThi
}
`;
