import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  Container,
  Grow,
  Grid,
} from '@material-ui/core';

// import useStyles from './styles';

import Posts from '../Posts/posts';
import Form from '../Forms/form';

import { getPosts } from '../../redux/actions';

import '../../index.css';

function Home() {
  const dispatch = useDispatch();
  //   const classes = useStyles();
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
        //   className={classes.mainContainer}
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
