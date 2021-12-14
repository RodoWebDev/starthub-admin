/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { Typography, Grid, TextField, Button } from '@material-ui/core';
import { LoginContext } from 'contexts/LoginContextContainer';

const HomeBusinessSectionItem = (props: any) => {
  const { data } = props;
  const [item, setItem] = useState({...data});
  const { updateItem } = useContext(LoginContext);

  const handleDataChange = (e: any, type: string) => {
    const temp: any = {...item};
    temp[type] = e.target.value;
    setItem(temp);
  }

  const saveItem = async () => {
    const temp = {...item};
    temp.id = temp._id;
    delete temp._id;
    try {
      await updateItem(temp);
    } catch (err) {
      console.log(err);
    }
  }

	return (
    <div className="tabItem">
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <div className="row">
            <Typography>Item section</Typography>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="row">
            <Button className="saveBtn" variant="contained" color="primary" size="medium" startIcon={<SaveIcon />} onClick={saveItem}>
              Save
            </Button>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="row">
            <Typography>Title</Typography>
          </div>
        </Grid>
        <Grid item xs={10}>
          <div className="row">
            <TextField label="" variant="outlined" value={item.title} onChange={(e) => handleDataChange(e, 'title')} fullWidth />
          </div>
        </Grid>
      </Grid>
    </div>
	);
};

export default HomeBusinessSectionItem;
