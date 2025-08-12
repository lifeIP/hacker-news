import * as React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Avatar, Box, ListItem } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';

import { observer } from 'mobx-react';
import appStore from '../../store/app_store';
import newsStore from '../../store/news_store';
import axios from 'axios';
import settings from "../../settings.json"
import news_store from '../../store/news_store';

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
    const [data, setData] = React.useState<{
        by: string;
        descendants: number;
        id: number;
        kids: number[];
        score: number;
        time: number;
        title: string;
        type: string;
        url: string;
    } | undefined>(undefined);
    const navigate = useNavigate();

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

            if (res.status === 200 || res.status === 201) {
                newsStore.addNewNews(res.data);
            } else {
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    React.useEffect(() => {
        if (newsStore.getItemById(newsId)) {
            setData(newsStore.getItemById(newsId));
        }
        else {
            getInfo(newsId);
            setData(newsStore.getItemById(newsId));
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
                        appStore.goToPage(1);
                        newsStore.setCurrentId(newsId);
                        console.log(news_store.currentId);
                        navigate("/news");
                    }}
                >
                    <CardContent>
                        <Grid container spacing={2}>
                            {/* Верхняя секция: Заголовок и дата публикации */}
                            <Grid size={12}>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    {data?.title}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {timeAgo(data?.time)}
                                </Typography>
                            </Grid>

                            {/* Средняя секция: Автор и рейтинг */}
                            <Grid size={12}>
                                <Box display="flex" alignItems="center">
                                    <Avatar>{data?.by.charAt(0).toUpperCase()}</Avatar>

                                    <Typography marginLeft="10px" variant="subtitle1" color="text.primary">
                                        {data?.by}
                                    </Typography>

                                    <Box ml="auto">
                                        <Typography>{data?.score}</Typography>
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