import { gql } from '@apollo/client';

export default {
  subscription: {
    getNotification: (fragment = 'id') => gql`
      subscription ($sinhVienId: ID!) {
        getNotification(sinhVienId: $sinhVienId) {
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
