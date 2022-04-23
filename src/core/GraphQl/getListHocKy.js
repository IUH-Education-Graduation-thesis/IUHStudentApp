import {gql} from '@apollo/client';

export default {
  query: {
    getListHocKy: (fragment = '') => gql`
      query {
        getListHocKy {
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
