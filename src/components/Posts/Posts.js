import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress, Typography } from '@mui/material'

import Post from './Post/Post';
import useStyles from './styles.js';

const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles();

    if (!posts?.length && !isLoading) {
        return (
            <Grid display='flex' justifyContent='center' alignContent='center' >
                <Typography variant='h4'>No Posts</Typography>
            </Grid>
        )
    }

    
    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xm={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={ setCurrentId } />
                    </Grid>
                ))}
            </Grid>
        )
    );
}
 
export default Posts;