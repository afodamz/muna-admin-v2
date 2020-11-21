import React, { useState } from "react";
import { makeStyles, Grid, Typography, Paper, Box } from "@material-ui/core";
import MenuBookTwoToneIcon from "@material-ui/icons/MenuBookTwoTone";
import { Button } from "../../../UiElements";
import { EditForm } from "./widget";

function ShowProverb({ ShowEdit, content = "loading ... " }) {
  return (
    <>
      <Typography variant="h3">
        <Box mb={1}>{content.content}</Box>
      </Typography>
      <Button onClick={ShowEdit} variant="outlined">
        Edit proverb
      </Button>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    "& svg": {
      width: "100%",
      fontSize: "4rem",
      color: theme.palette.text.secondary,
    },
  },
  submitButton: {
    float: "right",
  },
  items: {
    padding: theme.spacing(2.7),
  },
}));

const EditProverb = ({ content, submitUpdate }) => {
  const [edit, SetEdit] = useState(false); 
  const classes = useStyles();
  const UpdateHandler = (data, id) =>{
    submitUpdate(data, id, {updateType: content})
    SetEdit(!edit)
  }
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xm={12} sm={4} m="auto">
        <Paper className={classes.items}>
          <MenuBookTwoToneIcon />
        </Paper>
      </Grid>
      {content && (
        <Grid item xm={12} sm={8}>
          <Paper className={classes.items}>
            {!edit ? (
              <ShowProverb ShowEdit={() => SetEdit(!edit)} content={content} />
            ) : (
              <EditForm
                cancelEdit={() => SetEdit(!edit)}
                content={content}
                submit={(data, id)=>UpdateHandler(data, id)}
              />
            )}
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

export default EditProverb;
