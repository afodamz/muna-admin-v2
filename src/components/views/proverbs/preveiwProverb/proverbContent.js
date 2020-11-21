import React from "react";
import { makeStyles } from "@material-ui/core";
import { ProverbTab } from "./widget";

const tabTitle = [
  {
    id: 0,
    value: "Translation",
  },
  {
    id: 1,
    value: "Interpretation",
  },
  {
    id: 2,
    value: "Categories",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const ProverbContent = ({
  content,
  publishHandler,
  editHandler,
  deleteHandler,
  createActionHandler,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ProverbTab
        titles={tabTitle}
        content={content}
        publishHandler={publishHandler}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
        createActionHandler={createActionHandler}
      />
    </div>
  );
};

export default ProverbContent;
