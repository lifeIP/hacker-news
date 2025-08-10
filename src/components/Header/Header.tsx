import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { observer } from 'mobx-react';
import appStore from '../../store/store';

const pages = ['Главная', 'Новости'];


function Header() {
    const navigate = useNavigate();

    const handleClick = (index: number) => () => {
        appStore.goToPage(index);
        navigate(index == 0 ? "/" : "/news");
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
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Hacker News
                    </Typography>

                    <Box sx={{ display: "flex" }}>
                        
                        <Button
                            onClick={handleClick(0)}
                            disabled={appStore.pageId === 0 ? true : false}
                            sx={{ mx: 1 }}
                            color="inherit"
                        >
                            {pages[0]}
                        </Button>
                        <Button
                            onClick={handleClick(1)}
                            disabled={appStore.pageId === 1 ? true : false}
                            sx={{ mx: 1 }}
                            color="inherit"
                        >
                            {pages[1]}
                        </Button>
                        
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}


export default observer(Header);