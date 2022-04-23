import { gql } from "@apollo/client"

export default {
    query: {
        getDiem: (fragment) => gql`
            query GETDIEM{
                getDiem{
                    status
                    data{
                        ${fragment}
                    }
                }
            }
    `
    }

} 