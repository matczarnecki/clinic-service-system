import React from 'react';
import MaterialTable from 'material-table';
import { Card, Typography } from '@material-ui/core';

const UsersComponent = (props) => {
  return (
    <Card className="card">
      <Typography variant="h5" className="underline-title">
        Users
      </Typography>
      <div className="table">
        <MaterialTable
          columns={props.columns}
          data={props.data}
          title="Users"
          options={{
            emptyRowsWhenPaging: false,
          }}
          actions={[
            {
              icon: 'add',
              tooltip: 'Add user',
              isFreeAction: true,
              onClick: props.onAdd,
            },
            rowData => ({
              icon: 'edit',
              tooltip: 'Modify user',
              onClick: props.onEdit,
              disabled: !rowData.active,
            }),
            rowData => ({
              icon: 'delete',
              tooltip: 'Deactivate user',
              onClick: props.onDeactivate,
              disabled: !rowData.active,
            }),
            rowData => ({
              icon: 'lock',
              tooltip: 'Unlock user',
              onClick: props.onUnlock,
              disabled: !rowData.active || !rowData.blocked,
            }),
          ]}
        />
      </div>
    </Card>
  );
}

export default UsersComponent;