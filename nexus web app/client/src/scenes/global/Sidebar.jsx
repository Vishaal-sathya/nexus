import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddIcon from "@mui/icons-material/Add";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import TrafficOutlinedIcon from '@mui/icons-material/TrafficOutlined';
import BotIcon from '@mui/icons-material/SmartToy';
import DashIcon from '@mui/icons-material/InsertChart';


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <Box
      sx={{ minHeight:"100vh",zIndex:10,
        "& .pro-sidebar-inner": {
          background: `#f0f0f6 !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#FFA501 !important",
        },
        "& .pro-menu-item.active": {
          color: "#FFA501 !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={currentUser?.img || "/img/noavatar.jpg"}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {currentUser?.username || "User"}
                </Typography>
                <Typography variant="h5" color="orange">
                  {currentUser?.role || "Student"}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"} mb="0">
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<DashIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Event"
              to="/add"
              icon={<AddIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
            <Item
              title="Nexus AI"
              to="/chatbot"
              icon={<BotIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            

<Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          
            

{/* <Typography
  variant="h6"
  fontWeight="bold"
  color={colors.grey[300]}
  sx={{
    m: "15px 0 5px 20px",
    fontSize: { xs: '0.7rem', sm: '0.7rem' }, // Font size for mobile and larger screens
  }}
>
  Analytics
</Typography> */}

{/*             
            <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
            <Item
              title="News"
              to="/news"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
            <Item
              title="Total Report"
              to="/reportrange"
              icon={<SummarizeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             */}
           

          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
