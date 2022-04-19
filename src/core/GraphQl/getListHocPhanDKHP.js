import {gql} from '@apollo/client';

export default {
  query: {
    getListHocPhanDKHP: fragment => gql`
      query ($hocKyNormalId: ID!, $kieu: KieuDangKy!) {
        getListHocPhanDKHP(hocKyNormalId: $hocKyNormalId, kieu: $kieu) {
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
