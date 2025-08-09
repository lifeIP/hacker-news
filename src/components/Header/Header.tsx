import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';


const pages = ['Главная', 'Новости'];

interface HeaderProps {
  onPageSelected: (pageIndex: number) => void;
}

export default function Header({ onPageSelected }: HeaderProps) {
    const [activePage, setActivePage] = React.useState('Главная');

    const handleClick = (page: string, index: number) => () => {
        setActivePage(page);
        onPageSelected(index);
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