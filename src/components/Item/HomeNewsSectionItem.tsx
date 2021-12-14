/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { Typography, Grid, TextField, Button } from '@material-ui/core';
import { LoginContext } from 'contexts/LoginContextContainer';

const HomeNewsSectionItem = (props: any) => {
  const { data } = props;
  const [item, setItem] = useState(data);

  const { updateItem } = useContext(LoginContext);
  const [image, setImage] = useState(data.img);

  const onFileChange = (e: any, type: string) => {
    const temp: any = {...item};
    temp[type] = e.target.files[0];
    setItem(temp);
  }

  if (item.img) {
    var reader = new FileReader();
    reader.readAsDataURL(item.img);
    reader.onloadend = function (e: any) {
      setImage(reader.result);
    };
  }

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
        <Grid item xs={2}>
          <div className="row">
            <Typography>Description</Typography>
          </div>
        </Grid>
        <Grid item xs={10}>
          <div className="row">
            <TextField
              label=""
              multiline
              maxRows={4}
              variant="outlined"
              value={item.description}
              onChange={(e) => handleDataChange(e, 'description')}
              fullWidth
            />
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="row">
            <Typography>Action Text</Typography>
          </div>
        </Grid>
        <Grid item xs={10}>
          <div className="row">
            <TextField label="" variant="outlined" value={item.action} onChange={(e) => handleDataChange(e, 'action')} fullWidth />
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="row">
            <Typography>Image</Typography>
          </div>
        </Grid>
        <Grid item xs={10}>
          <div className="row">
            <input type="file" onChange={(e) => onFileChange(e, 'img')} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="row">
            <Typography className="subtitle">Preview</Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <img src={item.img ? image : item.imgUrl} alt="background-img"/>
        </Grid>
      </Grid>
    </div>
	);
};

export default HomeNewsSectionItem;
