import { gql } from '@apollo/client';

export default {
  mutation: {
    suaNotification: (fragment = 'id') => gql`
      mutation ($id: ID!, $isRead: Boolean!) {
        suaNotification(id: $id, isRead: $isRead) {
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
