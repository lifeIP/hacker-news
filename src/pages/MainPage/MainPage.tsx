import { List } from '@mui/material';
import * as React from 'react';
import NewsCard from '../../components/NewsCard/NewsCard';
import settings from "../../settings.json"
import axios from 'axios';
import newsStore from '../../store/news_store';
import { observer } from 'mobx-react';

function MainPage() {
    
    async function getListOfUpdates() {
        console.log(`${settings.server.addr}${settings.server.updates}${settings.server.addr_end}`);
        try {
            const res = await axios.get(`${settings.server.addr}${settings.server.updates}${settings.server.addr_end}`);

            if (res.status === 200 || res.status === 201) {
                newsStore.clearNews();
                newsStore.setListOfNews(res.data.slice(0, 100));
            } else {

            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    function timerFunc() {
        console.log("Таймер сработал!");
        newsStore.clearNews();
        getListOfUpdates();
    }
    let timer: any = undefined;

    React.useEffect(() => {
        if(newsStore.listOfNews.length === 0 ){
            getListOfUpdates();
        }
    }, []);

    React.useEffect(() => {
        timer = setInterval(timerFunc, 60000);
    }, []);

    return (<>
        <List disablePadding>
            {
               newsStore.listOfNews.map((item) => {
                    return (
                        <NewsCard
                            key={item}
                            newsId={item}
                            goToPage
                        />
                    )
                })
            }
        </List>
    </>);
}

export default observer(MainPage);