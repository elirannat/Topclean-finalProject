import React from "react";
import Container from "@mui/material/Container";
import PageHeader from "./../components/PageHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import ROUTES from './../routes/routesModel';


const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <PageHeader title="שגיאה 404" subtitle="הדף לא נמצא" />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" color="initial">
            אופס, זה לא אשמתכם... זה מה שקורה שמעסיקים מפתח ג'וניור 
          </Typography>
          <Button variant="text" color="primary" onClick={()=>navigate(ROUTES.CARDS)}>
            לחץ כאן כדי לחזור לדף הבית
          </Button>
        </Grid>
        <Grid item xs={12} md={4} justifyContent="center">
          <img
            width="100%"
            src="/assets/images/broken-robot.png"
            alt="broken robot"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ErrorPage;
