import React from 'react';
import { Typography } from '@material-ui/core';

const Footer = () => (
  <div className="footer">
    <Typography variant="overline" style={{float: 'right', marginRight: '1%'}}>
      Wersja: {process.env.REACT_APP_VERSION}
    </Typography>
  </div>
);

export default Footer;