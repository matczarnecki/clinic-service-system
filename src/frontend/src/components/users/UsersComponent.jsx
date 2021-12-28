import React from 'react';
import MaterialTable from 'material-table';
import { Card, Typography } from '@material-ui/core';

const UsersComponent = (props) => {
  return (
    <Card className="card">
      <Typography variant="h5" className="underline-title">
        Użytkownicy
      </Typography>
      <div className="table">
        <MaterialTable
          columns={props.columns}
          data={props.data}
          title="Użytkownicy"
          options={{
            emptyRowsWhenPaging: false,
          }}
          actions={[
            {
              icon: 'add',
              tooltip: 'Dodaj użytkownika',
              isFreeAction: true,
              onClick: props.onAdd,
            },
            rowData => ({
              icon: 'edit',
              tooltip: 'Modyfikuj użytkownika',
              onClick: props.onEdit,
              disabled: !rowData.active,
            }),
            rowData => ({
              icon: 'delete',
              tooltip: 'Dezaktywuj użytkownika',
              onClick: props.onDeactivate,
              disabled: !rowData.active,
            }),
          ]}
        />
      </div>
    </Card>
  );
}

export default UsersComponent;