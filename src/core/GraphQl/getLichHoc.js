import { gql } from "@apollo/client"

export default {
    query: {
        getLichHoc: (fragment) => gql`
            query GETLICHHOC($ngay: Date!){
                getLichHoc(ngay:$ngay){
                    status
                    data{
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
                        }
                    }
                }
            }
    `
    }

} 