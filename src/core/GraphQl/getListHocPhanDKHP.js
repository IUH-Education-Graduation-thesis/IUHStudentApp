import { gql } from "@apollo/client"

export default {
  query: {
    getListHocPhanDKHP: (fragment) => gql`
    query GET_LISTHOCPHAN_DKHP($hocKyDangKy: Int! ,$kieu: HOC_MOI){
      getListHocPhanDKHP(hocKyDangKy:$hocKyDangKy, kieu:$kieu){
        status
        message
        errors{
          message
          error_fields
        }
        data{
          ${fragment}
        }
      }
    }
    `
  }

} 