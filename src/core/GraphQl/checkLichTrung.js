import { gql } from '@apollo/client';

export default {
    mutation: {
        checkLichTrung: (fragment = 'id') => gql`
      mutation ($listLopHocPhanPrepareDangKy: [DangKyHocPhanInputs!]!,$hocKyNormalId:ID!) {
        checkLichTrung(listLopHocPhanPrepareDangKy: $listLopHocPhanPrepareDangKy,hocKyNormalId:$hocKyNormalId) {
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
