import { gql } from '@apollo/client';

export default {
  query: {
    getChuongTrinhKhung: (fragment) => gql`
      query {
        getChuongTrinhKhung {
          status
          errors {
            message
            error_fields
          }
          message
          data {
            hocKy
            tongSoTinChi
            hocPhansRes {
              maMonHoc
              tenMonHoc
              tinChi
              trangThai
            }
          }
        }
      }
    `,
  },
};
