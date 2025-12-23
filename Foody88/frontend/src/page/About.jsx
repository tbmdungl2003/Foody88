import React from 'react';
import { Box, Container, Typography, Paper, Grid, Divider } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import GroupIcon from '@mui/icons-material/Group';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

const About = () => {
  return (
    <Box sx={{ backgroundColor: '#f8eecbff', minHeight: '100vh', py: 5 }}>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <InfoIcon color="primary" sx={{ fontSize: 60 }} />
            <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mt: 2 }}>
              Foody88について
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
              Foody88のストーリーをご覧ください
            </Typography>
          </Box>
  
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, textAlign: 'center', mb: 4, maxWidth: '900px', mx: 'auto' }}>
            Foody88は、食への情熱と、食を愛する人々をベトナム中の最高の味と結びつけたいという願いから生まれました。私たちは、一つ一つの料理が単なる食事ではなく、物語であり、文化体験であると信じています。私たちの使命は、誰もが身近な屋台から高級レストランまで、美味しい料理を簡単に見つけ、共有し、評価できるコミュニティを築くことです。
          </Typography>
  
          <Grid container spacing={4} sx={{ textAlign: 'center', justifyContent: 'center', mt: 4 }}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <EmojiObjectsIcon color="secondary" sx={{ fontSize: 50, mb: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>使命</Typography>
                <Typography sx={{ maxWidth: '400px' }}>
                  信頼できる食の評価プラットフォームを提供し、ユーザーが最良の選択をする手助けをし、ベトナムの食文化を称えること。
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}><Divider sx={{ my: 2, maxWidth: '200px', mx: 'auto' }} /></Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <GroupIcon color="secondary" sx={{ fontSize: 50, mb: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>チーム</Typography>
                <Typography sx={{ maxWidth: '400px' }}>
                  私たちは、開発者と食を愛する情熱家からなるチームであり、皆様に最高の体験を提供するために協力しています。
                </Typography>
            </Box>
          </Grid>
        </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default About;