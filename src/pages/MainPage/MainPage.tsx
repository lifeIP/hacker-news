import { Fab, List } from '@mui/material';
import * as React from 'react';
import NewsCard from '../../components/NewsCard/NewsCard';
import settings from "../../settings.json"
import axios from 'axios';
import newsStore from '../../store/news_store';
import { observer } from 'mobx-react';

import UpdateIcon from '@mui/icons-material/Update';

function MainPage() {

    async function getListOfUpdates() {
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
    async function timerFunc() {
        console.log("Таймер сработал!");
        newsStore.clearNews();
        await getListOfUpdates();
    }

    React.useEffect(() => {
        if (newsStore.listOfNews.length === 0) {
            getListOfUpdates();
        }
    }, []);

    React.useEffect(() => {
        newsStore.startTimer(timerFunc);
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
        <Fab
            onClick={()=>{
                newsStore.stopTimer();
                newsStore.startTimer(timerFunc);
                newsStore.clearNews();
                getListOfUpdates();
            }}
            color="primary"
            sx={{
                position: "fixed",
                right: "15px",
                bottom: "15px"
            }}><UpdateIcon /></Fab>
    </>);
}

export default observer(MainPage);