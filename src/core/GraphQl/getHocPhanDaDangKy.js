import {gql} from '@apollo/client';

export default {
  query: {
    getLopHocPhanDaDangKy: (fragment = '') => gql`
      query ($hocKyId: ID!) {
        getLopHocPhanDaDangKy(hocKyId: $hocKyId) {
          status
          errors {
            message
            error_fields
          }
          message
          data {
            ${fragment}
          }
        }
      }
    `,
  },
};
