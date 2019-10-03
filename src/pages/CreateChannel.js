import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { CREATE_CHANNEL } from "queries/queries";
import { useApolloClient } from "@apollo/react-hooks";

const CreateChannel = ({ history }) => {
  const client = useApolloClient();

  const [channel, setChannel] = useState({ channelName: "" });
  const { channelName } = channel;
  const useStyles = makeStyles(theme => ({
    createChannelContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    },
    title: {
      marginBottom: theme.spacing(2),
      fontSize: "2rem",
      textAlign: "left",
    },
  }));

  const classes = useStyles();

  const handleChange = e => {
    setChannel({ ...channel, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await client.mutate({
        mutation: CREATE_CHANNEL,
        variables: { token: localStorage.getItem("token"), name: channelName },
      });
      if (data.createChannel.id) {
        alert("채널이 생성되었습니다!");
        history.push("/main");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container className={classes.createChannelContainer} maxWidth="xs">
      <div>
        <Typography className={classes.title} component="h1" variant="h5">
          채널 만들기
        </Typography>
        <ValidatorForm ref={() => "form"} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextValidator
                label="채널명"
                name="channelName"
                validators={["required"]}
                errorMessages={["채널명을 입력해 주세요"]}
                autoFocus
                fullWidth
                type="text"
                className={classes.loginInput}
                variant="outlined"
                margin="dense"
                onChange={handleChange}
                value={channelName}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary">
                채널 생성하기
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    </Container>
  );
};

export default CreateChannel;
