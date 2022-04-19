export const GETLOPHOCPHANFRAGMENT = `
id
maHocPhan
monHoc {
  id
  ten
}
batBuoc
soTinChiLyThuyet
soTinChiThucHanh
lopHocPhans {
  id
  maLopHocPhan
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
    giangVien {
      id
      hoTenDem
      ten
    }
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
}
`;
