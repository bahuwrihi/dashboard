import { useState } from "react";
import { Menu, Sidebar, MenuItem, SubMenu } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";
import { useSidebarContext } from "./sidebarContext";
import { Link } from "react-router-dom";
import { tokens } from "./Theme";
import { useTheme, Box, Typography } from "@mui/material";
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import LiveHelpRoundedIcon from '@mui/icons-material/LiveHelpRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import HelpIcon from '@mui/icons-material/Help';
import PhoneIcon from '@mui/icons-material/Phone';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from "./logo.svg"


const Item = ({ title, to, icon, selected, setSelected, newColor }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    let itemColor = selected === title ? colors.blueAccent[100] : colors.secondary;

    if (newColor && newColor !== "") {
        itemColor = newColor;
    }

    return (
        <MenuItem
            active={selected === title}
            style={{ color: itemColor }}
            onClick={() => setSelected(title)}
            icon={icon}>

            <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography>{title}</Typography>
            </Link>
        </MenuItem>
    );
};

const MyProSidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState("");
    const { sidebarRTL, sidebarImage } = useSidebarContext();
    const { collapsed } = useProSidebar();
    return (
        <Box
            sx={{
                position: "sticky",
                display: "flex",
                height: "100vh",
                top: 100,
                bottom: 0,
                zIndex: 10000,
                "& .sidebar": {
                    border: "none",
                },
                "& .menu-icon": {
                    backgroundColor: "transparent !important",
                },
                "& .menu-item": {
                    backgroundColor: "transparent !important",
                },
                "& .menu-anchor": {
                    color: "inherit !important",
                    backgroundColor: "transparent !important",
                },
                "& .menu-item:hover": {
                    color: `${colors.blueAccent[500]} !important`,
                    backgroundColor: "transparent !important",
                },
                "& .menu-item.active": {
                    color: `${colors.greenAccent[500]} !important`,
                    backgroundColor: "transparent !important",
                },
                '& .MuiTypography-root': {
                    fontSize: '1.2rem',
                },
                '& svg': {
                    fontSize: '1.2rem',
                },
            }}
        >
            <Sidebar
                breakPoint="md"
                rtl={sidebarRTL}
                backgroundColor={colors.white}
                image={sidebarImage}
            >
                <Menu iconshape="square">
                    {/* <Box
                        sx={{
                            paddingLeft: collapsed ? undefined : "10%",
                            marginBottom: "1rem",
                            marginTop: "1rem",
                            textAlign: "center",
                            "& img": {
                                width: "50%",
                            },
                        }}
                    >
                        <img src={logo} alt="Logo" />
                    </Box> */}

                    <Box paddingLeft={collapsed ? undefined : "10%"}
                    >
                        <Item
                            title="Analytics"
                            to="/dashboard"
                            icon={<SignalCellularAltRoundedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <SubMenu
                            icon={<BusinessCenterRoundedIcon />}
                            label="Ai category">

                            <Item
                                title="All categories"
                                to="/categories"
                                selected={selected}
                                setSelected={setSelected}
                            />

                            < Item
                                title="Create category"
                                to="/category_create"
                                selected={selected}
                                setSelected={setSelected}
                            />


                        </SubMenu>


                        <Item
                            title="Users"
                            to="/users"
                            icon={<PeopleAltRoundedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="FAQ"
                            to="/faq"
                            icon={<LiveHelpRoundedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Setting"
                            to="/setting"
                            icon={<SettingsRoundedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                    </Box>

                    <Box paddingLeft={collapsed ? undefined : "10%"}
                        position={"absolute"}
                        bottom={0}

                    >
                        <Item
                            title="Help Centre"
                            to="/help"
                            icon={<HelpIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Item
                            title="Contact us"
                            to="/contact"
                            icon={<PhoneIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Log out"
                            to="/login"
                            icon={<LogoutIcon />}
                            setSelected={setSelected}
                            newColor="red"
                        />


                    </Box>

                </Menu>



            </Sidebar>
        </Box>
    );
};

export default MyProSidebar;
