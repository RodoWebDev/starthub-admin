/* eslint-disable react-hooks/exhaustive-deps */
import { Typography, Grid, TextField } from '@material-ui/core';
import { useState } from 'react';
import './styles.scss'

const HeroSection = (props: any) => {
  const { sectionData, setSectionData, handleDataChange } = props;
  const [image, setImage] = useState(sectionData.img);

  const onFileChange = (e: any, type: string) => {
    const temp: any = {...sectionData};
    temp[type] = e.target.files[0];
    setSectionData(temp);
  }

  if (sectionData.img) {
    var reader = new FileReader();
    reader.readAsDataURL(sectionData.img);
    reader.onloadend = function (e: any) {
      setImage(reader.result);
    };
  }
	return (
    <Grid container spacing={3}>
      <Grid item xs={2}>
        <div className="row">
          <Typography>Title Row 1</Typography>
        </div>
      </Grid>
      <Grid item xs={10}>
        <div className="row">
          <TextField label="" variant="outlined" value={sectionData.title[0]} onChange={(e) => handleDataChange(e, 'title[0]')} fullWidth />
        </div>
      </Grid>
      <Grid item xs={2}>
        <div className="row">
          <Typography>Title Row 2</Typography>
        </div>
      </Grid>
      <Grid item xs={10}>
        <div className="row">
          <TextField label="" variant="outlined" value={sectionData.title[1]} onChange={(e) => handleDataChange(e, 'title[1]')} fullWidth />
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
        <img src={sectionData.img ? image : sectionData.imgUrl} alt="background-img"/>
      </Grid>
    </Grid>
	);
};

export default HeroSection;
