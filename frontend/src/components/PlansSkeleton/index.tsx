import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function PlansSkeleton() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {[...Array(10)].map((element, index) => (
          <Grid key={`skeleton-${index}`} item md={3} xs={12}>
            <Stack spacing={1}>
              <Skeleton variant='text' />
              <Skeleton variant='circular' width={40} height={40} />
              <Skeleton variant='rectangular' width={210} height={118} />
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
