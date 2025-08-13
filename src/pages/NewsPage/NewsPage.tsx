import * as React from 'react';
import NewsCard from '../../components/NewsCard/NewsCard';
import { Box, Button, List, ListItem, ListItemButton, Typography } from '@mui/material';

import { observer } from 'mobx-react';
import news_store from '../../store/news_store';
import CommentMain from '../../components/Comment/CommentMain';
import axios from 'axios';

import settings from "../../settings.json"

function NewsPage() {
    const [news, setNews] = React.useState<number[]>([]);
    const [newsLink, setNewsLink] = React.useState<string>("");

    async function getInfo(id: number) {

        try {
            const res = await axios.get(`${settings.server.addr}${settings.server.item}${id}${settings.server.addr_end}`);
            if (res.status === 200 || res.status === 201) {
                // console.log(res.data);
                setNewsLink(res.data.url);
                setNews(res.data.kids);
            } else {
            }
        } catch (err) {
            console.error(err);

        }
    }

    React.useEffect(()=>{
        getInfo(news_store.currentId);
        console.log(news);
    }, []);
    
    return (<>
        <List disablePadding>
            <NewsCard
                newsId={news_store.currentId}
                goToPage={false}
            />
            <ListItem>
                <Button 
                    component="a"
                    href={newsLink}
                    target="_blank"
                    // rel="noreferrer noopener"

                    variant="contained" 
                    fullWidth>
                    Перейти к источнику
                </Button>
            </ListItem>
            <ListItem>
                <Typography>
                    Комментарии:
                </Typography>
            </ListItem>
            {news?.length > 0? (
            <>
            {news?.map((item: number)=>(
                <ListItem>
                    <Box sx={{
                        width: "50vw"
                    }}>
                        <CommentMain id={item} parent_name={undefined}/>
                    </Box>
                </ListItem>
            ))}
            </>
            ):(<Box sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "50px",
                marginBottom: "50px"
            }}>
                <Typography variant='h3' color='gray'>Пусто</Typography>
            </Box>)}
        </List>
    </>);
}

export default observer(NewsPage);