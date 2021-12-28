import React from 'react';
import MaterialTable from 'material-table';
import { Card, Typography, Grid, Select, MenuItem, InputLabel, Divider } from '@material-ui/core';
import LabWorkerDialog from './LabWorkerDialog';

const LabWorkerComponent = (props) => {
  return (
    <>
      <Card className="card">
        <Typography variant="h5" className="underline-title">
          Badania
      </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <InputLabel>
              Status
        </InputLabel>
            <Select
              id="status"
              value={props.status}
              onChange={props.handleSelectChange}
              fullWidth
            >
              {props.statuses.map((element) => (
                <MenuItem value={element.code}>
                  {element.code} - {element.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Divider style={{ marginBottom: '2%', marginTop: '2%' }} />
        <div className="table">
          <MaterialTable
            title={props.title}
            columns={props.columns}
            data={props.data}
            options={{
              emptyRowsWhenPaging: false,
            }}
            isLoading={props.isLoading}
            actions={props.actions}
          />
        </div>
      </Card>

      <LabWorkerDialog
        open={props.dialogVisible}
        onClose={props.hideDialog}
        cancelSubmit={props.cancelTest}
        makeSubmit={props.makeTest}
        cancelMode={props.cancelMode}
        fetchData={props.fetchData}
      />
    </>
  );
}

export default LabWorkerComponent;