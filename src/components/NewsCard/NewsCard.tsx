import * as React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Avatar } from '@mui/material';
import Rating from '@mui/material/Rating';

// Интерфейс новостей
interface NewsItemProps {
    title: string;
    rating: number;
    author: string;
    publishedAt: string;
    imageUrl?: string;
}

// Компонент карточки новости
export default function NewsCard({
    title,
    rating,
    author,
    publishedAt,
    imageUrl
}: NewsItemProps) {
    return (
        <Card elevation={3}>
            <CardActionArea>
                {imageUrl && (
                    <CardMedia
                        component="img"
                        height="180"
                        src={imageUrl}
                        alt={`${title}`}
                    />
                )}
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <Typography gutterBottom variant="h5" component="h2">{title}</Typography>
                        </Grid>
                        <Grid size={6}>
                            <Avatar>{author.slice(0, 1)}</Avatar> <b>{author}</b>
                        </Grid>
                        <Grid size={6}>
                            <Typography color="textSecondary">{publishedAt}</Typography>
                        </Grid>
                        <Grid size={6}>
                            <Rating value={rating} readOnly precision={0.5} />
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}