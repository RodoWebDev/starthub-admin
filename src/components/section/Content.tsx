/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react';
import { Typography, Grid, TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { LoginContext } from 'contexts/LoginContextContainer';
import './styles.scss'

const ContentSection = (props: any) => {
  const { sectionData } = props;
  const [data, setData] = useState({...sectionData});
  const { updateSection } = useContext(LoginContext);

  const handleDataChange = (e: any, type: string, index: number) => {
    const temp: any = {...data};
    if (type === "description") {
      temp.description[index] = e.target.value;
    } else {
      temp[type] = e.target.value;
    }
    setData(temp);
  }

  const saveSection = async () => {
    const temp = {...data};
    delete temp.items;
    temp.id = temp._id;
    delete temp._id;
    try {
      await updateSection({...temp});
    } catch (err) {
      console.log(err);
    }
  }

	return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <div className="row">
            <Typography className="subtitle">Content Section</Typography>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="row btn_section">
            <Button className="saveBtn" variant="contained" color="primary" size="medium" startIcon={<SaveIcon />} onClick={saveSection}>
              Save
            </Button>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <div className="row">
            <Typography>Sub Title</Typography>
          </div>
        </Grid>
        <Grid item xs={10}>
          <div className="row">
            <TextField label="" variant="outlined" value={data.subTitle} onChange={(e) => handleDataChange(e, 'subTitle', 0)} fullWidth />
          </div>
        </Grid>
      </Grid>
      {sectionData.description.map((desc: any, index: number) => (
        <Grid container spacing={3}>
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
                value={desc}
                onChange={(e) => handleDataChange(e, 'description', index)}
                fullWidth
              />
            </div>
          </Grid>
        </Grid>
      ))}
    </>
	);
};

export default ContentSection;
