import React from 'react';
import { StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import PropTypes from 'prop-types';

const TableHocPhan = ({ header, data }) => {
  return (
    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
      <Row flexArr={[2, 5, 1, 2]} data={header} style={styles.head} textStyle={styles.text} />
      <Rows flexArr={[2, 5, 1, 2]} data={data} textStyle={styles.text} />
    </Table>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
});

export default TableHocPhan;

TableHocPhan.propTypes = {
  header: PropTypes.array,
  data: PropTypes.array,
};

TableHocPhan.defaultProps = {
  header: [],
  data: [],
};
