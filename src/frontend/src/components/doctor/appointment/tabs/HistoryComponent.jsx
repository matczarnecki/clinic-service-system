import React from 'react';
import MaterialTable from 'material-table';
import { Divider } from '@material-ui/core';

const HistoryComponent = (props) => {
  return (
    <>
      <div className="table">
        <MaterialTable
          columns={props.columns}
          data={props.data}
          title="Wizyty"
          options={{
            emptyRowsWhenPaging: false
          }}
          isLoading={props.isLoading}
        />
      </div>
    </>
  );
}

export default HistoryComponent;
