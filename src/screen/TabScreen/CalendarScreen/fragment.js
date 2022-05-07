export default {};

export const GETLICHHOC = `
        thu
        thuNumber
        listLichHoc{
            id
            ngayHocTrongTuan
            nhomThucHanh
            thoiGianBatDau
            thoiGianKetThuc
            tietHocBatDau
            tietHocKetThuc
            isLichThi
            lopHocPhan{
                tenLopHocPhan
                maLopHocPhan
                giangViens{
                    hoTenDem
                    ten
                  }
            }
            phongHoc{
                tenPhongHoc
              }
        }
`;
