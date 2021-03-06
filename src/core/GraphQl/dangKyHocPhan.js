import { gql } from '@apollo/client';

export default {
  mutation: {
    dangKyHocPhan: (fragment) => gql`
      mutation ($inputs: [DangKyHocPhanInputs!]!) {
        dangKyHocPhan(inputs: $inputs) {
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
