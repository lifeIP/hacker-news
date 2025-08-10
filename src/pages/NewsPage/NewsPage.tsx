import * as React from 'react';
import NewsCard from '../../components/NewsCard/NewsCard';
import { List } from '@mui/material';

import { observer } from 'mobx-react';
import appStore from '../../store/store';


function NewsPage() {

    return (<>
        <List disablePadding>
            <NewsCard
                title='Название Очень Очень Очень длииииииииииииноооооооооооое'
                rating={4.15}
                author='Artem'
                publishedAt='Today'
                goToPage={false}
            />
        </List>
    </>);
}

export default observer(NewsPage);