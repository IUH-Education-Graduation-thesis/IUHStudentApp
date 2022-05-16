import { gql } from '@apollo/client';

export default {
  mutation: {
    huyLopHocPhan: (fragment) => gql`
      mutation ($lopHocPhanId: ID!) {
        huyLopHocPhan(lopHocPhanId: $lopHocPhanId) {
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
