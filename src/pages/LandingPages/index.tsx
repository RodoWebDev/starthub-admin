/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import FullScreenLayout from 'Layouts';
import SaveIcon from '@material-ui/icons/Save';
import { LoginContext } from 'contexts/LoginContextContainer';
import Spinner from 'components/loading';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Select, FormControl, MenuItem, Typography, TextField, Checkbox } from '@material-ui/core';
import Section from 'components/section';
import './styles.scss'
import { FormType } from 'utils/utils';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
    paddingTop: 10,
    paddingBottom: 10,
    '& .MuiOutlinedInput-input': {
      paddingTop: 10,
      paddingBottom: 10
    }
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const LandingPages = () => {
  const { pagesLoading, pages, getPages, currentPage, setCurrentPage, addPage } = useContext(LoginContext);
  const classes = useStyles();
  const [data, setData] = useState<any>();

  const handleChangePage = (event: any) => {
    setCurrentPage(event.target.value);
  };

  const handleDataChange = (event: any, type: string) => {
    const tempData = {...data};
    tempData[type] = event.target.value;
    setData(tempData);
  }

  const handleCheckedItem = (type: string) => {
    const tempData = {...data};
    tempData[type] = !tempData[type];
    setData(tempData);
  }

  const savePageData = async () => {
    const temp = {...data};
    delete temp.sections;
    temp.id = temp._id;
    delete temp._id;
    try {
      await addPage(temp);
    } catch (err) {
      console.log(err);
    }
  }
  
  useEffect(() => {
    getPages();
  }, [])
  
  useEffect(() => {
    const tPages: any = pages;
    if (tPages.length !== 0) {
      setCurrentPage(tPages[0]?.type);
    }
    setData({...tPages[0]});
  }, [pages])
  
  useEffect(() => {
    const cPage: any = pages.filter((page: any) => page?.type === currentPage)[0];
    setData({...cPage});
  }, [currentPage])
  
  return (
    <FullScreenLayout>
      {pagesLoading || !data || !pages ? (
        <Spinner />
      )
      : (
        <div className="landing_pages_container">
          <div className="row pages_list">
            <div className="pages">
              <Typography>Pages: </Typography>
              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={currentPage}
                  onChange={handleChangePage}
                  label=""
                >
                  {pages?.map((page: any) => (
                    <MenuItem key={page.type} value={page.type}>{page.pageTitle}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="sections_container">
            <Grid container spacing={3}>
              <Grid item xs={10}>
                <p className="title">Page Datas</p>
              </Grid>
              <Grid item xs={12}>
                <Button className="saveBtn" variant="contained" color="primary" size="medium" startIcon={<SaveIcon />} onClick={savePageData}>
                  Save
                </Button>
              </Grid>
              <Grid item xs={2}>
                <div className="row">
                  <Typography>Title</Typography>
                </div>
              </Grid>
              <Grid item xs={10}>
                <div className="row">
                  <TextField label="" variant="outlined" value={data?.pageTitle} onChange={(e) => handleDataChange(e, 'pageTitle')} fullWidth />
                </div>
              </Grid>
            </Grid>
            {data.type !== "Home" && <Grid container spacing={3}>
              <Grid item xs={2}>
                <div className="row">
                  <Typography>Form Title</Typography>
                </div>
              </Grid>
              <Grid item xs={10}>
                <div className="row">
                  <TextField label="" variant="outlined" value={data?.formTitle} onChange={(e) => handleDataChange(e, 'formTitle')} fullWidth />
                </div>
              </Grid>
              <Grid item xs={2}>
                <div className="row">
                  <Typography>Form Type</Typography>
                </div>
              </Grid>
              <Grid item xs={10}>
                <div className="row">
                  <FormControl variant="outlined">
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={data?.formType}
                      onChange={(e) => handleDataChange(e, 'formType')}
                      label=""
                    >
                      {FormType?.map((form: any) => (
                        <MenuItem key={form} value={form}>{form}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={2}>
                <div className="row">
                  <Typography>Submit Button Text</Typography>
                </div>
              </Grid>
              <Grid item xs={10}>
                <div className="row">
                  <TextField label="" variant="outlined" value={data?.submitButtonText} onChange={(e) => handleDataChange(e, 'submitButtonText')} fullWidth />
                </div>
              </Grid>
            </Grid>}
            {data.type === "stream" && <Grid container spacing={3}>
              <Grid item xs={2}>
                <div className="row">
                  <Typography>Drop Text</Typography>
                </div>
              </Grid>
              <Grid item xs={10}>
                <div className="row">
                  <TextField label="" variant="outlined" value={data?.dropText} onChange={(e) => handleDataChange(e, 'dropText')} fullWidth />
                </div>
              </Grid>
            </Grid>}
            <div className="row pages_list">
              <div className="pages">
                <Checkbox
                  className="slider_check check"
                  checked={data.containsNews}
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  onChange={(e) => handleCheckedItem('containsNews')}
                />
                <Typography className="slider_title">Contains News</Typography>
              </div>
            </div>
          </div>
          <div className="sections_container">
            <Grid container spacing={3}>
              <Grid item xs={10}>
                <p className="title">Sections</p>
              </Grid>
              <Grid item xs={12}>
                {data.sections.map((section: any) => (
                  <Section data={section} key={section._id} currentPage={currentPage} />
                ))}
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </FullScreenLayout>
  )
}

export default LandingPages
