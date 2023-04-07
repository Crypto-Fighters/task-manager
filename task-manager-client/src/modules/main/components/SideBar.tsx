import React from "react";
import { useLocation } from "react-router";
import {
    DashboardOutlined,
} from "@mui/icons-material";
import {Box, Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery} from "@mui/material";
import {ICON} from "../contans";
import {NavLink} from "react-router-dom";
import Typography from "@mui/material/Typography";

const Menuitems = [
    {
        title: "Аккаунты",
        icon: DashboardOutlined,
        href: "/dashboard/accounts",
    },
    {
        title: "Создать задачу",
        icon: DashboardOutlined,
        href: "/dashboard/task",
    },
    {
        title: "Календарь",
        icon: DashboardOutlined,
        href: "/dashboard/calendar",
    },
];

export const Sidebar = (props: {isSidebarOpen: boolean, onSidebarClose: () => void, isMobileSidebarOpen: boolean}) => {
    const [open, setOpen] = React.useState(0);
    const { pathname } = useLocation();
    const pathDirect = pathname;
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

    const handleClick = (index: number) => {
        if (open === index) {
            setOpen(open);
        } else {
            setOpen(index);
        }
    };

    const SidebarContent = (
        <Box sx={{ p: 3, height: "calc(100vh - 40px)" }}>
            <Box sx={{ display: "flex", alignItems: "Center" }}>
                <img height={80} src={ICON}></img>
                <Typography style={{ marginTop: '20px', marginLeft: '15px', fontSize: '20px', fontWeight: '600'}}>Crypto Fighters</Typography>
            </Box>

            <Box>
                <List
                    sx={{
                        mt: 4,
                        marginTop: 2,
                    }}
                >
                    {Menuitems.map((item, index) => {
                        return (
                            <List component="li" disablePadding key={item.title}>
                                <ListItem
                                    onClick={() => handleClick(index)}
                                    button
                                    component={NavLink}
                                    to={item.href}
                                    selected={pathDirect === item.href}
                                    sx={{
                                        mb: 1,
                                        borderRadius: '50px',
                                        ...(pathDirect === item.href && {
                                            color: "white",
                                            backgroundColor: (theme) =>
                                                `${theme.palette.primary.main} !important`,
                                        }),
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            ...(pathDirect === item.href && { color: "white" }),
                                        }}
                                    >
                                        <item.icon width="20" height="20" />
                                    </ListItemIcon>
                                    <ListItemText>{item.title}</ListItemText>
                                </ListItem>
                            </List>
                        );
                    })}
                </List>
            </Box>
        </Box>
    );
    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open={props.isSidebarOpen}
                variant="persistent"
                PaperProps={{
                    sx: {
                        width: 300,
                        position: 'unset',
                        display: 'flex',
                        boxShadow: '0px 2px 13px -10px #000'
                    },
                }}
            >
                {SidebarContent}
            </Drawer>
        );
    }
    return (
        <Drawer
            anchor="left"
            open={props.isMobileSidebarOpen}
            onClose={props.onSidebarClose}
            PaperProps={{
                sx: {
                    width: 300,
                    position: 'unset',
                    display: 'flex',
                    boxShadow: '0px 2px 13px -10px #000'
                },
            }}
            variant="temporary"
        >
            {SidebarContent}
        </Drawer>
    );
};
