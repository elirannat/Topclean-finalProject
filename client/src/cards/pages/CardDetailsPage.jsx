import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import PageHeader from "../../components/PageHeader";
import { useParams } from "react-router-dom";
import useCards from "../hooks/useCards";
import mapCardToModel from "../helpers/normalization/mapToModel";
import Typography from "@mui/material/Typography";
import { Avatar, Grid, Button, Input, Checkbox } from "@mui/material";
import { Box } from "@mui/system";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ComputerIcon from "@mui/icons-material/Computer";
import BusinessIcon from "@mui/icons-material/Business";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import { useUser } from "../../users/providers/UserProvider";

const CardDetailsPage = () => {
  const { user } = useUser();

  const [cardData, setCardData] = useState("");
  const { cardId } = useParams();
  const { handleGetCard, handleAdminNumber, value } = useCards();
  const { isLoading, error, card } = value;

  useEffect(() => {
    handleGetCard(cardId).then((data) => {
      const modeledCard = mapCardToModel(data);
      setCardData(modeledCard);
    });
    console.log(cardData);
  }, [cardId, handleGetCard]);
  return (
    <Container>
      <PageHeader
        title="Business Card Details"
        subtitle="Here you can find more details about the business"
      />
      {isLoading && <Spinner />}
      {error && <Error errorMessage={error} />}

      {card && (
        <>
          {" "}
          <Box className="center" flexDirection={"column"}>
            <Avatar
              alt="busienes card img"
              src={cardData.imageUrl}
              sx={{ width: 300, height: 300 }}
            />
            <Typography variant="h2" color="-moz-initial">
              {card.title}
            </Typography>
            <Typography variant="h3" color="-moz-initial">
              {card.subtitle}
            </Typography>
            <Typography variant="h4" color="-moz-initial">
              {card.bizNumber}
            </Typography>

            <Box sx={{ display: user && user.isAdmin ? "block" : "none" }}>
              <Input
                name="bizNumber"
                label="bizNumber"
                type="number"
                onChange={(e) => (cardData.bizNumber = e.target.value)}
                placeholder={`${cardData.bizNumber}`}
              />
              <Button
                variant="text"
                color="primary"
                onClick={() => handleAdminNumber(cardId, cardData)}
              >
                new number
              </Button>
            </Box>
          </Box>
          <Grid
            container
            minHeight={180}
            spacing={1}
            mb={5}
            mt={5}
            alignItems="center"
          >
            <Grid item xs={12} sm={6} md={3} align="center">
              <EmailIcon fontSize="large" color="primary" />
              <Typography variant="h5" color="-moz-initial">
                {cardData.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} align="center">
              <PhoneIphoneIcon fontSize="large" color="primary" />
              <Typography variant="h5" color="-moz-initial">
                {cardData.phone}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} align="center">
              <ComputerIcon fontSize="large" color="primary" />
              <Checkbox
              disabled
                checked = {cardData.isDone}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} align="center">
              <BusinessIcon fontSize="large" color="primary" />
              <Typography variant="h5" color="-moz-initial">
                {cardData.street}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default CardDetailsPage;
