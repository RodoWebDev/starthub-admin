/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Typography, Grid, TextField } from '@material-ui/core';
import HomeBusinessSectionItem from 'components/Item/HomeBusinessSectionItem';
import './styles.scss'

const BusinessSection = (props: any) => {
  const { sectionData, handleDataChange } = props;
	return (
    <Grid container spacing={3}>
      <Grid item xs={2}>
        <div className="row">
          <Typography>Title</Typography>
        </div>
      </Grid>
      <Grid item xs={10}>
        <div className="row">
          <TextField label="" variant="outlined" value={sectionData.title} onChange={(e) => handleDataChange(e, 'title')} fullWidth />
        </div>
      </Grid>
      <Grid item xs={2}>
        <div className="row">
          <Typography>Sub Title</Typography>
        </div>
      </Grid>
      <Grid item xs={10}>
        <div className="row">
          <TextField label="" variant="outlined" value={sectionData.subTitle} onChange={(e) => handleDataChange(e, 'subTitle')} fullWidth />
        </div>
      </Grid>
      <Grid item xs={2}>
        <div className="row">
          <Typography>Description</Typography>
        </div>
      </Grid>
      <Grid item xs={10}>
        <div className="row">
          <TextField label="" variant="outlined" value={sectionData.description} onChange={(e) => handleDataChange(e, 'description')} fullWidth />
        </div>
      </Grid>
      <Grid item xs={2}>
        <div className="row">
          <Typography>Action</Typography>
        </div>
      </Grid>
      <Grid item xs={10}>
        <div className="row">
          <TextField label="" variant="outlined" value={sectionData.action} onChange={(e) => handleDataChange(e, 'action')} fullWidth />
        </div>
      </Grid>
      {sectionData.items.map((item: any) => (
        <HomeBusinessSectionItem data={item} key={item._id} />
      ))}
    </Grid>
	);
};

export default BusinessSection;
