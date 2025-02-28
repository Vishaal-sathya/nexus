import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Button 
} from '@mui/material';
import { jsPDF } from "jspdf";
import newRequest from '../../utils/newRequest';
import Header from '../../components/Header';

const DisasterSummary = () => {
  const [disasters, setDisasters] = React.useState([]);

  React.useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const response = await newRequest.get('/ocrdata');
        console.log('API response:', response.data);
        setDisasters(response.data.ocrData || []); 
      } catch (error) {
        console.error('Error fetching OCR data:', error);
      }
    };

    fetchDisasters();
  }, []);

  if (!disasters.length) {
    return (
      <Box 
        sx={{
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '300px',
          backgroundColor: '#F0F0F0',
          border: '2px solid #4A4A4A'
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#2C3E50', 
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 1
          }}
        >
          Loading Official Disaster Report
        </Typography>
      </Box>
    );
  }

  const latestDisaster = disasters[0];

  const formattedData = typeof latestDisaster.report === 'string' ? latestDisaster.report : '';
  
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Government-style header
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text("OFFICIAL REPORT", 105, 15, { align: 'center' });
    doc.setLineWidth(0.5);
    doc.line(20, 20, 190, 20);

    // Disaster Details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text("DISASTER REPORT", 20, 30);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Disaster Type: ${latestDisaster.disaster_type.toUpperCase()}`, 20, 40);
    doc.text(`Severity Level: ${latestDisaster.severity.toUpperCase()}`, 20, 47);
    doc.text(`Location: ${latestDisaster.location.toUpperCase()}`, 20, 54);
    doc.text(`Source: ${latestDisaster.news_source.toUpperCase()}`, 20, 61);

    // Report Body
    doc.setFont('helvetica', 'bold');
    doc.text("DETAILED REPORT:", 20, 70);
    
    doc.setFont('helvetica', 'normal');
    const splitText = doc.splitTextToSize(formattedData, 170);
    doc.text(splitText, 20, 80);

    // Footer with watermark
    doc.setTextColor(150);
    doc.setFont('helvetica', 'bold');
    doc.text("REPORT GENERATED BY REVIVE", 105, 220, { align: 'center', angle: 45 });

    doc.save("OFFICIAL_DISASTER_REPORT.pdf");
  };

  return (
    <Box 
      sx={{ 
        backgroundColor: '#F0F0F0', 
        minHeight: '100vh', 
        padding: 3,
        fontFamily: 'Arial, sans-serif'
      }}
    >
        <Header title="DISASTER SUMMARY" subtitle="Download the summary report" titleSize="h4" />
      <Card 
  sx={{ 
    border: '2px solid #4A4A4A', 
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    backgroundColor: 'white',
    padding: '20mm',  /* A4 paper is approximately 210mm x 297mm */
    width: '210mm',  /* A4 width */
    height: 'auto', /* A4 height */
    margin: 'auto' /* Center the card on the page */
  }}
>
        <CardContent>
          <Box 
            sx={{ 
              borderBottom: '2px solid #4A4A4A', 
              paddingBottom: 2, 
              marginBottom: 2 
            }}
          >
            <Typography 
              variant="h4" 
              sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'bold', 
                color: '#2C3E50',
                letterSpacing: 1
              }}
            >
              Official Disaster Report <strong>Summary</strong>
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Disaster Type: 
                <Typography component="span" sx={{ ml: 1 }}>
                  {latestDisaster.disaster_type.toUpperCase()}
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Severity: 
                <Typography 
                  component="span" 
                  sx={{ 
                    ml: 1,
                    color: 
                      latestDisaster.severity.toLowerCase() === 'high' ? 'red' : 
                      latestDisaster.severity.toLowerCase() === 'medium' ? 'orange' : 'green',
                    fontWeight: 'bold'
                  }}
                >
                  {latestDisaster.severity.toUpperCase()}
                </Typography>
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="h6" sx={{ mt: 3, mb: 2, fontWeight: 'bold' }}>
            Detailed Report:
          </Typography>
          <Box 
            sx={{ 
              border: '1px solid #4A4A4A', 
              padding: 2, 
              backgroundColor: '#F9F9F9' 
            }}
          >
            <Typography variant="body1">
              {formattedData}
            </Typography>
          </Box>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">
                <strong>Location:</strong> {latestDisaster.location}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">
                <strong>Source:</strong> {latestDisaster.news_source}
              </Typography>
            </Grid>
          </Grid>

          <Box 
            sx={{ 
              mt: 3, 
              display: 'flex', 
              justifyContent: 'space-between',
              borderTop: '1px solid #4A4A4A',
              paddingTop: 2
            }}
          >
            <Button 
              variant="outlined" 
              color="primary"
              onClick={() => window.history.back()}
              sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'bold',
                borderWidth: 2
              }}
            >
              Back to Dashboard
            </Button>
            <Button 
  variant="outlined" 
  color="primary"
  href="mailto:" // Replace with your desired email
  sx={{ 
    textTransform: 'uppercase', 
    fontWeight: 'bold',
    borderWidth: 2
  }}
>
  Send to
</Button>

            <Button 
              variant="contained" 
              color="primary"
              onClick={generatePDF}
              sx={{ 
                textTransform: 'uppercase', 
                fontWeight: 'bold'
              }}
            >
              Generate Official Report
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DisasterSummary;