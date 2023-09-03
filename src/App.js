import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';

// Import your modified data
import sayings from "./data/sayings.js";
import pronunciations from "./data/pronunciations.js";

// Create a map to group pronunciations by saying_id
const pronunciationsMap = pronunciations.reduce((map, pronunciation) => {
  if (!map[pronunciation.saying_id]) {
    map[pronunciation.saying_id] = [];
  }
  map[pronunciation.saying_id].push(pronunciation);
  return map;
}, {});

function App() {
  return (
    <div style={{ margin: "32px" }}>
      <h1>Mis dichos favoritos en español</h1>


      <p>If you want to contribute please send an email to <code>moises.trejo0[at]gmail.com</code> with your sound submission!</p>
      <p style ={{marginTop: "16px"}}>Submission file name format: <code>[saying_id]_[name].mp3</code> ex: <code>1_moises.mp3</code></p>
      <p style ={{marginTop: "16px"}}>Here is my list of saying that is constantly growing: <a href={"https://maize-crib-365.notion.site/Espa-ol-Spanish-0ddcd40efcf440e2b93a95c88d2be5d7"}>LINK</a> Cuales me faltan?</p>

      <Stack spacing={2} mt={8}>
        {sayings.map((saying, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>"{saying.text}" - ({pronunciationsMap[saying.id]?.length || 0})</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <code>saying_id: {saying.id}</code>
              
              <Box mt={2}></Box>

              {pronunciationsMap[saying.id]?.map((pronunciation, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center" }}>
                  <audio controls>
                    <source src={pronunciation.audio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  <p style={{ marginLeft: "32px" }}> by {pronunciation.name}</p>
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>

      <Box mt={4}></Box>

      

    </div>
  );
}

export default App;
