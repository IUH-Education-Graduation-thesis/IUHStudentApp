import { gql } from "@apollo/client"

export default {
  query: {
    findSinhVien: (fragment = '') => gql`
query{
    findSinhVien{
      data{
        data{
          id
          maSinhVien
          ten
          hoTenDem
          maHoSo
          gioiTinh
          avatar
          ngaySinh
          soDienThoai
          diaChi
          trangThai
          lop{
            ten
          }
          noiSinh
          bacDaoTao
        }
      }
    }
  }
`
  }

} 