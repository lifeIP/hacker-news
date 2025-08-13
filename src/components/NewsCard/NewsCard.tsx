import * as React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Avatar, Box, ListItem } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


import { observer } from 'mobx-react';
import newsStore from '../../store/news_store';
import axios from 'axios';
import settings from "../../settings.json"

// Интерфейс новостей
interface NewsItemProps {
    newsId: number;
    goToPage: boolean;
}

// Компонент карточки новости
function NewsCard({
    newsId,
    goToPage
}: NewsItemProps) {
    const navigate = useNavigate();
    const [title, setTitle] = React.useState("");
    const [time, setTime] = React.useState(0);
    const [by, setBy] = React.useState("");
    const [score, setScore] = React.useState(0);

    function timeAgo(timestamp: number | undefined) {
        if (timestamp) {
            const currentTime = Date.now();           // Получаем текущее время в миллисекундах
            const givenTimeMs = timestamp * 1000;     // Приводим timestamp к миллисекундам

            const differenceMs = currentTime - givenTimeMs; // Разница в миллисекундах
            const minutesPassed = Math.floor(differenceMs / (1000 * 60));

            if (minutesPassed < 60) { return `${minutesPassed} minutes ago`; }
            else { return `${Math.round(minutesPassed / 60)} hours ago`; }
        }
        else return "";
    }

    async function getInfo(id: number) {

        try {
            const res = await axios.get(`${settings.server.addr}${settings.server.item}${id}${settings.server.addr_end}`);
            console.log(`${settings.server.addr}${settings.server.item}${id}${settings.server.addr_end}`);
            if (res.status === 200 || res.status === 201) {
                console.log(res.data);
                setTitle(res.data.title);
                setBy(res.data.by);
                setScore(res.data.score);
                setTime(res.data.time);
                newsStore.addNewNews(res.data);
            } else {
            }
        } catch (err) {
            console.error(err);
            navigate("/");
        }
    }

    React.useEffect(() => {
        const item = newsStore.getItemById(newsId);
        if (item) {
            setTitle(item.title);
            setBy(item.by);
            setScore(item.score);
            setTime(item.time);
        }
        else {
            getInfo(newsId);
            const item = newsStore.getItemById(newsId);
            if (item) {
                setTitle(item.title);
                setBy(item.by);
                setScore(item.score);
                setTime(item.time);
            }
        }
    }, []);


    return (
        <ListItem>
            <Card sx={{
                width: "50vw"
            }}>
                <CardActionArea
                    disabled={goToPage ? false : true}
                    onClick={() => {
                        newsStore.setCurrentId(newsId);
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
                                    {timeAgo(time)}
                                </Typography>
                            </Grid>

                            {/* Средняя секция: Автор и рейтинг */}
                            <Grid size={12}>
                                <Box display="flex" alignItems="center">
                                    <Avatar>{by.charAt(0).toUpperCase()}</Avatar>

                                    <Typography marginLeft="10px" variant="subtitle1" color="text.primary">
                                        {by}
                                    </Typography>

                                    <Box ml="auto" display="flex">
                                        <Typography>{score}</Typography>
                                        <FavoriteBorderIcon sx={{marginLeft: "5px"}}/>
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