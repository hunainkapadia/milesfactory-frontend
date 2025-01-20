'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../store/slices/counter/counterSlice';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <Box textAlign="center" mt={4}>
      <h1>Counter: {count}</h1>
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(increment())}
          style={{ marginRight: '10px' }}
        >
          Increment
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => dispatch(decrement())}
          style={{ marginRight: '10px' }}
        >
          Decrement
        </Button>
        <Button variant="outlined" onClick={() => dispatch(reset())}>
          Reset
        </Button>
      </Box>
    </Box>
  );
}
