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
`
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
