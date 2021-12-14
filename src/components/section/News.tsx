/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Typography, Grid, TextField } from '@material-ui/core';
import HomeNewsSectionItem from 'components/Item/HomeNewsSectionItem';
import './styles.scss'

const NewsSection = (props: any) => {
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
      {sectionData.items.map((item: any) => (
        <HomeNewsSectionItem data={item} key={item._id} />
      ))}
    </Grid>
	);
};

export default NewsSection;
