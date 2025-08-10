import * as React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Avatar, Box, ListItem } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';

import { observer } from 'mobx-react';
import appStore from '../../store/store';


// Интерфейс новостей
interface NewsItemProps {
    title: string;
    rating: number;
    author: string;
    publishedAt: string;
    goToPage: boolean;
}

// Компонент карточки новости
function NewsCard({
    title,
    rating,
    author,
    publishedAt,
    goToPage
}: NewsItemProps) {
    const navigate = useNavigate();

    return (
        <ListItem>
            <Card sx={{
                width: "50vw"
            }}>
                <CardActionArea
                    disabled={goToPage?false:true}
                    onClick={()=>{
                        appStore.goToPage(1);
                        navigate("/news");
                    }}
                >
                    <CardContent>
                        <Grid container spacing={2}>
                            {/* Верхняя секция: Заголовок и дата публикации */}
                            <Grid size={12}>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    {title}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {publishedAt}
                                </Typography>
                            </Grid>

                            {/* Средняя секция: Автор и рейтинг */}
                            <Grid size={12}>
                                <Box display="flex" alignItems="center">
                                    <Avatar>{author.charAt(0).toUpperCase()}</Avatar>

                                    <Typography marginLeft="10px" variant="subtitle1" color="text.primary">
                                        {author}
                                    </Typography>

                                    <Box ml="auto">
                                        <Rating value={rating} readOnly/>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </ListItem>
    );
}

export default observer(NewsCard);