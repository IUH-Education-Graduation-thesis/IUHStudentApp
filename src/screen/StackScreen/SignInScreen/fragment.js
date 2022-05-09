export const LOGIN_FRAGMENT = `
token 
sinhVien {
  id
  maSinhVien
  maHoSo
  hoTenDem
  ten
  avatar
  gioiTinh
  ngayVaoDang
  ngayVaoTruong
  ngayVaoDoan
  ngaySinh
  soDienThoai
  diaChi
  noiSinh
  email
  soCMND
  bacDaoTaoString
  trangThaiString
  danTocString
  tonGiaoString
  loaiHinhDaoTaoString
  lop {
    id
    ten
    khoa {
      id
      khoa
      chuyenNganh {
        id
        ten
        khoaVien {
          id
          ten
        }
      }
    }
  }
}
`;
