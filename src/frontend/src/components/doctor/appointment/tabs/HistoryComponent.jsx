import React from 'react';
import MaterialTable from 'material-table';

const HistoryComponent = (props) => {
  return (
    <>
      <div className="table">
        <MaterialTable
          columns={props.columns}
          data={props.data}
          title="Previous appointments"
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
