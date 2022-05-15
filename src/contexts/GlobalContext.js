import React, { useState } from 'react';
import PropTypes from 'prop-types';
import queries from '../core/GraphQl';
import { GET_NOTIFICATION_FRAGMENT } from '../screen/TabScreen/HomeScreen/fragment';
import { useSubscription } from '@apollo/client';
import { useSelector } from 'react-redux';
import { getSinhVienSelectors } from '../redux/selectors/selectorStudents';

const GlobalContext = React.createContext();
const GlobalConsumer = GlobalContext.Consumer;

const getNotificationSubscription = queries.subscription.getNotification(GET_NOTIFICATION_FRAGMENT);
const GlobalProvider = (props) => {
  const sv = useSelector(getSinhVienSelectors);
  const { data: dataGetNotification } = useSubscription(getNotificationSubscription, {
    skip: !sv?.id,
    variables: {
      sinhVienId: 1,
    },
  });

  const listNotification = dataGetNotification?.getNotification?.data || [];

  return (
    <GlobalContext.Provider value={{ listNotification }}>{props.children}</GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalConsumer, GlobalProvider };

GlobalProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any),
};
GlobalProvider.defaultProps = {
  children: {},
};
