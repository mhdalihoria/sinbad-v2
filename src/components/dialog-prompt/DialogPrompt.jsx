import React from 'react';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const DialogPrompt = ({ title, description, buttons }) => {
  return (
    <Card>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {buttons}
      </DialogActions>
    </Card>
  );
};

export default DialogPrompt;
