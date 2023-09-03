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

      <p>If you want to contribute send an email to moises.trejo0[at]gmail.com</p>

      <p>Submission format: [saying_id]_[name].[mp3]</p>


      <Stack spacing={2}>
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
