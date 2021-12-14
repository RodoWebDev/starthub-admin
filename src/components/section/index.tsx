/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { Button, Typography, Grid } from '@material-ui/core';
import { LoginContext } from 'contexts/LoginContextContainer';
import HeroSection from './Hero';
import BusinessSection from './Business';
import StatusSection from './Status';
import NewsSection from './News';
import ContentSection from './Content';
import './styles.scss'

const Section = (props: any) => {
  const { data, currentPage } = props;
  const [sectionType] = useState(data.type);
  const [sectionData, setSectionData] = useState({...data});
  const { updateSection } = useContext(LoginContext);

  const handleDataChange = (e: any, type: string) => {
    const temp: any = {...sectionData};
    if (type === "title[0]") {
      temp.title[0] = e.target.value;
    } else if (type === "title[1]") {
      temp.title[1] = e.target.value;
    } else {
      temp[type] = e.target.value;
    }
    setSectionData(temp);
  }

  const saveSection = async () => {
    const temp = {...sectionData};
    delete temp.items;
    temp.id = temp._id;
    delete temp._id;
    try {
      await updateSection(temp);
    } catch (err) {
      console.log(err);
    }
  }

	return (
		<div className="section">
      {currentPage === "Home" && <Grid container spacing={3}>
        <Grid item xs={9}>
          <div className="row">
            <Typography className="subtitle">{sectionType} Section</Typography>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className="row btn_section">
            <Button className="saveBtn" variant="contained" color="primary" size="medium" startIcon={<SaveIcon />} onClick={saveSection}>
              Save
            </Button>
          </div>
        </Grid>
      </Grid>}
      {sectionType === 'Hero' && <div className="section-content">
        <HeroSection
          sectionData={sectionData}
          setSectionData={setSectionData}
          handleDataChange={handleDataChange}
        />
      </div>}
      {sectionType === 'Business' && <div className="section-content">
        <BusinessSection
          sectionData={sectionData}
          handleDataChange={handleDataChange}
        />
      </div>}
      {sectionType === 'Status' && <div className="section-content">
        <StatusSection
          sectionData={sectionData}
          setSectionData={setSectionData}
          handleDataChange={handleDataChange}
        />
      </div>}
      {sectionType === 'News' && <div className="section-content">
        <NewsSection
          sectionData={sectionData}
          setSectionData={setSectionData}
          handleDataChange={handleDataChange}
        />
      </div>}
      {currentPage !== "Home" && <div className="section-content">
        <ContentSection
          sectionData={sectionData}
        />
      </div>}
		</div>
	);
};

export default Section;
