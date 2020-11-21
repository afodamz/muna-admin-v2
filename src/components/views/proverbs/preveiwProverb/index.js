import React, { useEffect } from "react";
// import {withRouter} from 'react-dom'
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";
import ProverbContent from "./proverbContent";
import EditProverb from "./editProverb";
import {
  UpdateProverb,
  UpdateProverbProp,
  CreateProverbProp,
  DeleteProverbProp,
  PublishProverbProp,
  ActivateProverb,
} from "../../../../Redux/Actions/ProverbActions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const PreviewProverb = ({
  proverbs: { activeProverb, loading },
  DeleteProverbProp,
  UpdateProverb,
  CreateProverbProp,
  UpdateProverbProp,
  ActivateProverb,
  match,
}) => {
  let id = match.params.id;
  useEffect(() => {
    ActivateProverb(id);
  }, [ActivateProverb, id]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {activeProverb ? (
        <>
          <EditProverb content={activeProverb} submitUpdate={UpdateProverb} />
          <ProverbContent
            content={activeProverb}
            publishHandler={PublishProverbProp}
            deleteHandler={DeleteProverbProp}
            editHandler={(data)=>UpdateProverbProp(data, id)}
            createActionHandler={(data, id)=>CreateProverbProp(data, id)}
          />
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  proverbs: state.proverbs,
});

export default connect(mapStateToProps, {
  DeleteProverbProp,
  UpdateProverbProp,
  UpdateProverb,
  PublishProverbProp,
  CreateProverbProp,
  ActivateProverb,
})(PreviewProverb);
