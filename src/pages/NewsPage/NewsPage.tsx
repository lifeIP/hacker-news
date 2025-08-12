import * as React from 'react';
import NewsCard from '../../components/NewsCard/NewsCard';
import { Button, List, ListItem, ListItemButton, Typography } from '@mui/material';

import { observer } from 'mobx-react';
import appStore from '../../store/app_store';
import news_store from '../../store/news_store';


function NewsPage() {
    
    return (<>
        <List disablePadding>
            <NewsCard
                newsId={news_store.currentId}
                goToPage={false}
            />
            <ListItem>
                <Button variant="contained" fullWidth>
                    Перейти к источнику
                </Button>
            </ListItem>
            <ListItem>
                <Typography>
                    Комментарии:
                </Typography>
            </ListItem>
        </List>
    </>);
}

export default observer(NewsPage);