import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const pages = ['Главная', 'Новости'];


export default function Header() {
    const navigate = useNavigate();
    const [activePage, setActivePage] = React.useState('Главная');

    const handleClick = (page: string, index: number) => () => {
        setActivePage(page);
        navigate(index==0? "/":"/news");
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
                        {pages.map((page, index) => (
                            <Button
                                key={page}
                                onClick={handleClick(page, index)}
                                disabled={activePage === page ? true : false}
                                sx={{ mx: 1 }}
                                color="inherit"
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}