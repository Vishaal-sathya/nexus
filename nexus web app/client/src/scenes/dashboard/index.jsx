import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Chip, IconButton, Typography, useTheme, useMediaQuery, List, ListItem, Card, CardContent, Divider } from "@mui/material";
import { tokens } from "../../theme";
import Modal from "@mui/material/Modal";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import newRequest from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { ColorModeContext } from "../../theme";
import PendingIcon from "@mui/icons-material/Pending";
import InventoryIcon from "@mui/icons-material/Inventory";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import LineChart2 from "../../components/LineChart2";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import StatBox from "../../components/StatBox";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ProgressCircle from "../../components/ProgressCircle";
import "./dashboard1.scss"
import LocalShipping from '@mui/icons-material/LocalShipping';
import Sidebar from '../global/Sidebar';
import NewsSlider from '../../components/newsSlider/NewsSlider';
import Marquee from 'react-fast-marquee';
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import useSound from 'use-sound'; 
import buzzerSound from './buzzer.wav';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BookIcon from '@mui/icons-material/Book';
import EventIcon from '@mui/icons-material/Event';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const Dashboard1 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [ocrData, setOcrData] = useState([]);
  const [isLoading2, setIsLoading] = useState(true);
  const [error2, setError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
const [latestData, setLatestData] = useState([]);
const mapRef = useRef(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};



  const getSeverityColor = (severity) => {
    const lowercaseSeverity = severity?.toLowerCase();
    switch(lowercaseSeverity) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
      default:
        return 'success';
    }
  }
  const { data: inventoryData, isLoading : isLoading1, error: error1 } = useQuery({
    queryKey: ["inventory"],
    queryFn: () => newRequest.get("/inventory").then((res) => res.data),
  });
  useEffect(() => {
    if (inventoryData) {
      console.log(inventoryData); // Log inventoryData after it has been fetched
    }
  }, [inventoryData]);

  const inventoryItems = Array.isArray(inventoryData?.inventoryItems) ? inventoryData.inventoryItems : [
    { itemName: "Item A", count: 20 },
    { itemName: "Item B", count: 15 },
    { itemName: "Item C", count: 10 },
    { itemName: "Item D", count: 5 },
  ];
console.log(inventoryItems);
const [isBlinking, setIsBlinking] = useState(false);
  const [playBuzzer] = useSound(buzzerSound);

  



  const handleRefresh = () => {
    setLatestData(ocrData);
    setIsBlinking(true);
    playBuzzer();
    setShowPopup(true);

    setTimeout(() => {
      setIsBlinking(false);
    }, 8000); 

    
  };

  useEffect(() => {
    const handleMiddleClick = (event) => {
      if (event.button === 1) {
        event.preventDefault(); // Prevents default browser behavior for middle-click
        handleRefresh();
      }
    };

    // Attach event listener
    window.addEventListener('mousedown', handleMiddleClick);

    // Clean up event listener
    return () => {
      window.removeEventListener('mousedown', handleMiddleClick);
    };
  }, [ocrData]);
console.log(ocrData[0])
const handleClosePopup = () => setShowPopup(false);
  
  const { data: ordersData, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: () => newRequest.get("/orders").then((res) => res.data),
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newRequest.get('/ocrdata'); 
        console.log('API response:', response.data.ocrData.length); 
        setOcrData(response.data.ocrData || []); 
      } catch (error) {
        console.error('Error fetching OCR data:', error);
      }
    };

    fetchNews();


  }, []);

  const orders = Array.isArray(ordersData?.orders) ? ordersData.orders : [];
  const donationCount = orders.length;
  const recentDonations = orders.slice(-6);
  const activeDisasters = ocrData.length;
  const severeDisasters = ocrData.filter((item) => item.severity === "high").length;
  const uniqueLocations = new Set(ocrData.map((item) => item.location)).size;


  const processData = (data) => {
    const counts = {
      High: 0,
      Medium: 0,
      Low: 0,
    };

    data.forEach((item) => {
      if (item.severity === "high") {
        counts.High++;
      } else if (item.severity === "medium") {
        counts.Medium++;
      } else if (item.severity === "low") {
        counts.Low++;
      }
    });

    return [
      { severity: "High", count: counts.High },
      { severity: "Medium", count: counts.Medium },
      { severity: "Low", count: counts.Low },
    ];
  };

  const chartData = processData(ocrData);
  const pinnedLocations = [
    // {
    //   location: "Odisha",
    //   disaster_type: "Flood",
    //   severity: "high",
    //   timestamp: "2024-12-06 10:30:00",
    //   report: "Severe flooding due to incessant rains has affected several districts in Odisha, causing widespread damage."
    // },
    // {
    //   location: "Chennai",
    //   disaster_type: "Cyclone",
    //   severity: "medium",
    //   timestamp: "2024-12-07 08:15:00",
    //   report: "Cyclone impact in Chennai led to power outages and tree falls in the coastal areas."
    // },
    {
      name:"TechnoBix",
      locaton:"Chennai",
      college: "Rajalakshmi Engineering College",
      date: "2025-02-12 10:30:00",
      desc:"Technical symposium with multiple mini events"
    },
    {
      name:"Happyfox Hackathon",
      locaton:"Chennai",
      college: "Rajalakshmi Engineering College",
      date: "2025-02-24 10:30:00",
      desc:"Technical hackathon for 3rd and 4th years with exciting prizes"
    },
  ];
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.gomaps.pro/maps/api/js?key=AlzaSyU90DpF7dwn-eFgHEAQbZNYb5kjz1u8G-u&libraries=geometry,places&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = initMap;

    document.body.appendChild(script);
  }, []);

  const initMap = (coordinates) => {
    if (coordinates) {
      const { lat, lng } = coordinates;
      window.open(`https://maps.gomaps.pro/maps?q=${lat},${lng}&z=15`, '_blank');
    }
  };

  const handleMapPopup = (coordinates) => {
    initMap(coordinates);
  };
  
  const textArray = [
    "Severe weather warning: Heavy rainfall expected tomorrow.",
    "Flood alert: Evacuate low-lying areas immediately.",
    "Earthquake detected: Stay indoors and protect yourself.",
    "Tsunami warning: Move to higher ground immediately.",
    "Emergency helpline: Dial 12345 for assistance.",
    "Heatwave alert: Stay hydrated and avoid outdoor activities.",
    "Shelter locations: Nearest relief camp is at XYZ Community Center.",
    "Power outage expected: Prepare with emergency supplies.",
    "Road closures: Avoid Route 56 due to landslides.",
    "Stay tuned: Follow official channels for updates.",
  ];
  
  

  return (
    <Box display="flex">
      {isBlinking && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            zIndex: 9999,
            animation: 'blink 0.5s alternate infinite',
          }}
        ></div>
      )}
      
      <style>
        {`
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
      <Modal
        isOpen={showMapModal}
        onRequestClose={() => setShowMapModal(false)}
        contentLabel="Map Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            height: '600px',
            width: '95%',
            margin: 'auto',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }
        }}
      >
        <div
        ref={mapRef}
        id="map"
        style={{ height: '600px', width: '95%', borderRadius: '10px', margin:"auto", display:'flex', alignItems:'center', justifyContent:'center' }}
      ></div>
      </Modal>
      {/* SIDEBAR */}
      <Sidebar/>

      <Box flexGrow={1} m="30px">
      {/* HEADER */}
      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center">
        <Header title="STUDENT DASHBOARD" subtitle="Welcome to your dashboard" titleSize="h4" />
        
       
      

<Box mt={isMobile ? '20px' : '0'}>
{/* <Button
    onClick={handleRefresh}
   
    sx={{
      marginRight: "10px",
      marginBottom:"20px",
      backgroundColor: colors.greenAccent[700],
      color: colors.grey[100],
      fontSize: "14px",
      fontWeight: "bold",
      padding: "10px 20px",
    }}
  >
   
  </Button> */}
 
  
</Box>

      </Box>
     

   
      <Box
        display="grid"
        gridTemplateColumns={isMobile ? '1fr' : 'repeat(12, 1fr)'}
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
  gridColumn={isMobile ? 'span 12' : 'span 3'}
  display="flex"
  alignItems="center"
  justifyContent="center"
  sx={{
  borderRadius: "15px",
  backgroundImage: "linear-gradient(to bottom right, #f0f0f6, #eaf6fb)", // Sky blue gradient
  boxShadow: `
    8px 8px 16px rgba(0, 0, 0, 0.15), 
    -8px -8px 16px rgba(255, 255, 255, 0.9)
  `, // Dual shadow for 3D effect
  border: "none", // Neomorphism often avoids solid borders
}}

>
          <StatBox
            title={ activeDisasters}
            subtitle="Total Points"
            progress="0.75"
            increase="+14%"
            
            icon={
              <EmojiEventsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
  gridColumn={isMobile ? 'span 12' : 'span 3'}
  display="flex"
  alignItems="center"
  justifyContent="center"
  sx={{
    borderRadius: "15px",
    background: 'linear-gradient(to bottom right, #f0f0f6, #eaf6fb)', // Light gray for neomorphism background
    boxShadow: `
      8px 8px 16px rgba(0, 0, 0, 0.15), 
      -8px -8px 16px rgba(255, 255, 255, 0.9)
    `, // Dual shadow for 3D effect
    border: "none", // Neomorphism often avoids solid borders
  }}
>
          <StatBox
            title={severeDisasters}
            subtitle="Number of Courses Completed"
            progress="0.50"
            increase="+21%"
            icon={
              <BookIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
  gridColumn={isMobile ? 'span 12' : 'span 3'}
  display="flex"
  alignItems="center"
  justifyContent="center"
  sx={{
    borderRadius: "15px",
    background: 'linear-gradient(to bottom right, #f0f0f6, #eaf6fb)', // Light gray for neomorphism background
    boxShadow: `
      8px 8px 16px rgba(0, 0, 0, 0.15), 
      -8px -8px 16px rgba(255, 255, 255, 0.9)
    `, // Dual shadow for 3D effect
    border: "none", // Neomorphism often avoids solid borders
  }}
>
          <StatBox
            title={uniqueLocations}
            subtitle="Number of Events Participated"
            progress="0.30"
            increase="+5%"
            icon={
              <EventIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
  gridColumn={isMobile ? 'span 12' : 'span 3'}
  display="flex"
  alignItems="center"
  justifyContent="center"
  sx={{
    borderRadius: "15px",
    background: 'linear-gradient(to bottom right, #f0f0f6, #eaf6fb)', // Light gray for neomorphism background
    boxShadow: `
      8px 8px 16px rgba(0, 0, 0, 0.15), 
      -8px -8px 16px rgba(255, 255, 255, 0.9)
    `, // Dual shadow for 3D effect
    border: "none", // Neomorphism often avoids solid borders
  }}
>
          <StatBox
            title="16"
            subtitle="Connections Made This month"
            progress="0.80"
            increase="+43%"
            icon={
              <PeopleAltIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        
       


        {/* ROW 2 */}
        <Box
  gridColumn={isMobile ? 'span 12' : 'span 8'}
  gridRow="span 2"
  sx={{
    borderRadius: "15px",
    background: '#f0f0f6', // Light gray for neomorphism background
    boxShadow: `
      8px 8px 16px rgba(0, 0, 0, 0.15), 
      -8px -8px 16px rgba(255, 255, 255, 0.9)
    `, // Dual shadow for 3D effect
    border: "none", // Neomorphism often avoids solid borders
  }}
>
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            flexDirection={isMobile ? 'column' : 'row'}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box mb={isMobile ? '20px' : '0'}>
              <Typography
                variant="h4"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Usage Data
              </Typography>
              <Typography
                variant="h5"
               
                color={colors.greenAccent[500]}
              >
                Statistics
              </Typography>
            </Box>
            {/* <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box> */}
          </Box>
          
          <Box height="250px" mt="-20px">
            <BarChart ocrData={ocrData} isDashboard={true} />
          </Box>
        </Box>
        <Box
  gridColumn={isMobile ? 'span 12' : 'span 4'}
  gridRow="span 2"
  backgroundColor={colors.primary[400]}
  overflow="auto"
>
<Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        overflow="auto"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            borderRadius: "0px",
            background: colors.grey, // Light gray for neomorphism background
            boxShadow: `
              8px 8px 16px rgba(0, 0, 0, 0.1), 
              -8px -8px 16px rgba(255, 255, 255, 0.7)
            `, // Dual shadow for 3D effect
            border: "none", // Neomorphism often avoids solid borders
          }}
          alignItems="center"
          borderBottom={`4px solid ${colors.primary[500]}`}
          colors={colors.grey[100]}
          p="15px"
        >
          <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            Pinned Events
          </Typography>
        </Box>
        
        {pinnedLocations.length > 0 ? (
          pinnedLocations.map((location, i) => (
            <Box
              key={`${location.locaton}-${i}`}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
                {location.name}
              </Typography>
              <Typography color={colors.grey[100]}>
                {location.location}
              </Typography>
              <Typography color={colors.grey[100]}>
                Location: {location.college.charAt(0).toUpperCase() + location.college.slice(1)}
              </Typography>
              <Typography variant="body2">
                Date: {new Date(location.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2">
                Description: {location.desc}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography color={colors.grey[100]} p="15px">No pinned locations found</Typography>
        )}
      </Box>
    </Box>

        {/* ROW 3 */}
        <Box
          gridColumn={isMobile ? 'span 12' : 'span 4'}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          sx={{
            borderRadius: "15px",
            background: '#f0f0f6', // Light gray for neomorphism background
            boxShadow: `
              8px 8px 16px rgba(0, 0, 0, 0.1), 
              -8px -8px 16px rgba(255, 255, 255, 0.7)
            `, // Dual shadow for 3D effect
            border: "none", // Neomorphism often avoids solid borders
          }}
        >
          <Typography variant="h5" fontWeight="600">
            PieChart
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="135"/>
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {chartData[0].count} Events  and {chartData[1].count} workshops 
            </Typography>
            <Typography></Typography>
          </Box>
          
        </Box>
        <Box
          gridColumn={isMobile ? 'span 12' : 'span 4'}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          sx={{
            borderRadius: "15px",
            background: '#f0f0f6', // Light gray for neomorphism background
            boxShadow: `
              8px 8px 16px rgba(0, 0, 0, 0.1), 
              -8px -8px 16px rgba(255, 255, 255, 0.7)
            `, // Dual shadow for 3D effect
            border: "none", // Neomorphism often avoids solid borders
          }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Points Summary
          </Typography>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn={isMobile ? 'span 12' : 'span 4'}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
          sx={{
            borderRadius: "15px",
            background: '#f0f0f6', // Light gray for neomorphism background
            boxShadow: `
              8px 8px 16px rgba(0, 0, 0, 0.1), 
              -8px -8px 16px rgba(255, 255, 255, 0.7)
            `, // Dual shadow for 3D effect
            border: "none", // Neomorphism often avoids solid borders
          }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Offline - Online Events
          </Typography>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart2 isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
    <Modal
  open={showPopup}
  onClose={handleClosePopup}
  aria-labelledby="popup-title"
  aria-describedby="popup-description"
>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      borderRadius: "10px",
    }}
  >
    {/* Red Blinking Curved Box for Severity */}
    <Box
      sx={{
        position: "absolute",
        top: "15px",
        right: "15px",
        px: 2,
        py: 0.5,
        fontSize: "13px",
        borderRadius: "10px",
        backgroundColor: "rgba(255, 0, 0, 0.8)",
        color: "#fff",
        fontWeight: "bold",
        boxShadow: "0px 0px 10px rgba(255, 0, 0, 0.7)",
        animation: "blinker 1s linear infinite",
        "@keyframes blinker": {
          "50%": { opacity: 0.5 },
        },
      }}
    >
      Severity: {ocrData[0]?.severity || "Unknown"}
    </Box>

    <Typography id="popup-title" variant="h5" component="h2">
      <strong>Latest OCR Data</strong>
    </Typography>
    <Box id="popup-description" mt={2}>
      {ocrData.length ? (
        <>
          <Typography><strong>Location:</strong> {ocrData[0]?.location || "No location available"}</Typography>
          <Typography><strong>Disaster Type:</strong> {ocrData[0]?.disaster_type || "No disaster type available"}</Typography>
          <Typography><strong>News Source:</strong> {ocrData[0]?.news_source || "No news source available"}</Typography>
          <Typography><strong>Timestamp:</strong> {ocrData[0]?.timestamp || "No timestamp available"}</Typography>
          <Typography><strong>Coordinates:</strong> Lat: {ocrData[0]?.coordinates?.lat || "N/A"}, Lng: {ocrData[0]?.coordinates?.lng || "N/A"}</Typography>
         
        </>
      ) : (
        <Typography>No data available</Typography>
      )}
    </Box>
    <Button
      onClick={handleClosePopup}
      sx={{ mt: 3, backgroundColor: colors.blueAccent[500], color: "#fff" }}
    >
      Close
    </Button>
  </Box>
</Modal>



    </Box>
  );
  
};



export default Dashboard1;
