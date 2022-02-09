import { Divider, Drawer, List, ListItem, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/system'

interface SideBarProps {
    drawerOpen: boolean;
    handleDrawerToggle: () => void; 

}

const SideBar = ({ drawerOpen, handleDrawerToggle }: SideBarProps) => {

    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('md'));
    const drawerWidth = 240;
    const genList = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <Drawer
            variant={mobile ? "temporary" : "permanent"}
            open={drawerOpen}
            onClose={handleDrawerToggle}
            anchor="left"
            sx={{
                width: drawerWidth,
                '& .MuiDrawer-paper': {
                    width: drawerWidth
                }
            }}
        >
            <List>
                {genList.map((a) => {
                    return (
                        <>
                            <ListItem>{`Item ${a}`}</ListItem>
                            <Divider />
                        </>
                    )
                })}
            </List>
        </Drawer>
    );
};

export default SideBar;