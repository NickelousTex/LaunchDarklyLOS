import React, { useState } from 'react';
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import { v4 as uuidv4 } from 'uuid';
import { Button, TextField, Box, Typography, Paper, LinearProgress, Grid } from '@mui/material';

const EventTracker = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [lastTrackedValue, setLastTrackedValue] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState({
    min: null,
    max: null,
    avg: null,
    count: 0
  });
  
  const ldClient = useLDClient();

  const trackRandomEvent = () => {
    const randomValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    const context = {
      kind: 'user',
      key: uuidv4(),
      anonymous: true
    };

    ldClient.track('random-value-event', context, { value: randomValue });
    return randomValue;
  };

  const runBatchEvents = async () => {
    setIsRunning(true);
    setProgress(0);
    let sum = 0;
    let min = Infinity;
    let max = -Infinity;
    const totalEvents = 10000;
    
    for (let i = 0; i < totalEvents; i++) {
      const value = trackRandomEvent();
      sum += value;
      min = Math.min(min, value);
      max = Math.max(max, value);
      setLastTrackedValue(value);
      
      // Update progress every 100 events to avoid too many re-renders
      if (i % 100 === 0) {
        setProgress((i / totalEvents) * 100);
        setStats({
          min,
          max,
          avg: sum / (i + 1),
          count: i + 1
        });
        // Small delay to allow UI updates
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }

    setProgress(100);
    setStats({
      min,
      max,
      avg: sum / totalEvents,
      count: totalEvents
    });
    setIsRunning(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        LaunchDarkly Event Tracker
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Min Value"
          type="number"
          value={minValue}
          onChange={(e) => setMinValue(Number(e.target.value))}
          size="small"
          disabled={isRunning}
        />
        <TextField
          label="Max Value"
          type="number"
          value={maxValue}
          onChange={(e) => setMaxValue(Number(e.target.value))}
          size="small"
          disabled={isRunning}
        />
      </Box>

      <Button 
        variant="contained" 
        onClick={runBatchEvents}
        fullWidth
        disabled={isRunning}
      >
        Track 10,000 Random Events
      </Button>

      {isRunning && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            Progress: {Math.round(progress)}%
          </Typography>
        </Box>
      )}

      {stats.count > 0 && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Typography variant="body2">Events tracked: {stats.count}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">Average value: {stats.avg.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">Min value: {stats.min}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">Max value: {stats.max}</Typography>
          </Grid>
        </Grid>
      )}

      {lastTrackedValue !== null && (
        <Typography sx={{ mt: 2 }}>
          Last tracked value: {lastTrackedValue}
        </Typography>
      )}
    </Paper>
  );
};

export default EventTracker; 