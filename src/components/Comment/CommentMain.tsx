import * as React from 'react';

import { observer } from 'mobx-react';
import axios from 'axios';

import settings from "../../settings.json";
import { Avatar, Box, Button, Card, CardContent, colors, Grid, IconButton, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function CommentMain({ id, parent_name }: { id: number, parent_name: string | undefined }) {
    const [commentData, setCommentData] = React.useState<{
        by: string;
        id: number;
        kids: number[];
        parent: number;
        text: string;
        time: number;
        type: string;
    }>({
        by: '',
        id: 0,
        kids: [],
        parent: 0,
        text: '',
        time: 0,
        type: '',
    });

    const [commentDeleted, setCommentDeleted] = React.useState(false);
    React.useEffect(() => {

        axios.get(`${settings.server.addr}${settings.server.item}${id}${settings.server.addr_end}`)
            .then((res) => {
                if (res?.data?.deleted === true) {
                    setCommentDeleted(true);
                }
                else {
                    setCommentData(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
                setCommentDeleted(true);
            });

    }, []);
    React.useEffect(() => {
        console.log(id);
        console.log(commentData);
    }, [commentData]);

    return (
        <>{commentDeleted ? <></> : (
            <Box
                marginLeft={parent_name !== undefined ? "15px" : 'none'}
                borderLeft={commentData?.kids?.length !== 0 ? "2px solid lightgray": '0px'}
                marginBottom="15px"
            >
                <Card sx={{
                    marginLeft: "5px",
                    marginBottom: "15px"
                }}>
                    <CardContent>
                        <Grid container spacing={2}>

                            {/* Первая строка: Имя автора и дата комментария */}
                            <Grid size={12}>
                                <Box display="flex" alignItems="center">
                                    <Avatar>{commentData.by.charAt(0).toUpperCase()}</Avatar>
                                    <Typography variant="subtitle1" color="text.primary" sx={{ ml: 1 }}>
                                        {commentData.by}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                                        {commentData.time}
                                    </Typography>
                                </Box>
                            </Grid>

                            {/* Вторая строка: Сам текст комментария */}
                            <Grid size={12}>
                                <Typography variant="body1" color="text.primary">
                                    {commentData.text}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Box sx={{
                            position: "relative",
                            display: "flex",
                            justifyContent: "right",
                            alignItems: "center",
                        }}>
                            <Typography>{commentData?.kids?.length}</Typography>
                            {commentData?.kids?.length > 0 ? (
                                <IconButton>
                                    <ExpandMoreIcon />
                                </IconButton>
                            ) : <></>}
                        </Box>
                    </CardContent>
                </Card>
                {commentData?.kids?.map((item) => (
                    <CommentMain id={item} parent_name={commentData.by} />
                ))}
            </Box>
        )}
        </>
    );
};



export default observer(CommentMain);