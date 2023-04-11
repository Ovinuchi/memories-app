import React, { useState, useRef } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentPost } from '../../actions/posts'

const CommentsSection = ({ post }) => {
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch();
    const commentsRef = useRef();
    const user = JSON.parse(localStorage.getItem('profile'))

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;
        
        const newComments = await dispatch(commentPost(finalComment, post._id))
        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer} >
                <div className={classes.commentsInnerContainer} >
                    <Typography gutterBottom variant='h6' >Comments</Typography>
                    {comments.map((com, i) => (
                        <Typography key={i} gutterBottom variant='subtitle1'>
                            <strong>{com.split(': ')[0]}</strong>
                            {com.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name && (
                <div style={{ width: '70%' }} >
                    <Typography gutterBottom variant='h6' >Write aComment</Typography>
                    <TextField
                        fullWidth 
                        rows={4}
                        variant='outlined'
                        label='Comment'
                        multiline
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button style={{ width: '100%', marginTop: '10px' }} color='primary' disabled={!comment} variant='contained' onClick={handleClick}>
                        Comment
                    </Button>
                </div>
                )}
            </div>
        </div>
    );
};

export default CommentsSection;
