import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { observer } from 'mobx-react';
import appStore from '../../store/app_store';

const pages = ['Главная', 'Новости'];


function Header() {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        appStore.goToPage(0);
        navigate("/");
    };


    return (
        <AppBar position="static">
            <Toolbar variant="dense" sx={{
                display: "flex",
                justifyContent: "center"
            }}>
                <Box sx={{
                    width: "50vw",
                    display: "inline-flex"
                }}>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        <span onClick={handleHomeClick}>Hacker News</span>
                    </Typography>

                    
                    <Box sx={{ display: "flex" }}>
                        <Button
                            onClick={handleHomeClick}
                            sx={{ mx: 1 }}
                            color="inherit"
                        >
                            {pages[0]}
                        </Button>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}


export default observer(Header);