import { gql } from "@apollo/client"

export default {
    query: {
        getProfile: (fragment = '') => gql`
    query {
        getProfile {
          status
          errors {
            message
            error_fields
          }
          message
          data {
            id
            userName
            roles
            sinhVien {
              id
              hoTenDem
              ten
            }
          }
        }
      }
      
`
    }

} 