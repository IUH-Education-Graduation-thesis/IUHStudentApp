import { gql } from "@apollo/client"

export default {
    query: {
        getLichHoc: (fragment) => gql`
            query($ngay: Date!){
                getLichHoc(ngay:$ngay){
                    status
                    message
                    data{
                        ${fragment}
                    }
                }
            }
    `
    }

} 