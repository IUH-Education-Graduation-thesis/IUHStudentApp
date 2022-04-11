import { info_sv } from "../core/GraphQl/findSinhVien";

export const getInfoSinhVien = () => {
    const { loading, error, data } = useQuery(info_sv);
}
