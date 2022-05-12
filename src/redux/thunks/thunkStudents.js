import { useQuery } from '@apollo/client';
import { info_sv } from '../../core/GraphQl/findSinhVien';
import { getSinhVienFail, getSinhVienSuccess } from '../actions/studentActions';

export const getRequestSinhVien = () => {
  return async (dispatch) => {
    try {
      const { loading, error, data } = useQuery(info_sv);
      dispatch(getSinhVienSuccess(data));
    } catch (error) {
      dispatch(getSinhVienFail());
    }
  };
};
