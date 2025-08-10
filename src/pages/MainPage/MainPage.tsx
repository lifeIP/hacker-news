import { List } from '@mui/material';
import * as React from 'react';
import NewsCard from '../../components/NewsCard/NewsCard';


export default function MainPage(){

    return(<>
        <List disablePadding>
            <NewsCard
                title='Название Очень Очень Очень длииииииииииииноооооооооооое'
                rating={4.15}
                author='Artem'
                publishedAt='Today'
                goToPage
            />
            <NewsCard
                title='Название'
                rating={3.1}
                author='Artem'
                publishedAt='Today'
                goToPage
            />
        </List>
    </>);
}