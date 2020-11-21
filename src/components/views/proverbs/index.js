import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { makeStyles, Box } from "@material-ui/core";
import { Modal } from "../../UiElements";
import { ProverbTable } from "./widgets";
import Page from "../../general/Pages";
import { CreateProverb } from "./widgets";
import {
  FetchProverb,
  CreateProverbAction,
  DeleteProverb,
  ActivateProverb,
  UpdateProverb
} from "../../../Redux/Actions/ProverbActions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  tableField: {
    background: theme.palette.background.paper,
    borderTop: "4px solid green",
    padding: theme.spacing(3, 2),
  },
  addProverbModal: {
    marginTop: theme.spacing(1),
    float: "right",
  },
  tableRoot: {},
  table: {
    marginTop: theme.spacing(1),
  },
}));

const Proverbs = ({
  history,
  FetchProverb,
  CreateProverbAction,
  DeleteProverb,
  UpdateProverb,
  proverbs: { loading, proverbs, ...rest },
}) => {
  const [closeModal, setModal] = useState(false);
  useEffect(() => {
    FetchProverb();
  }, [FetchProverb]);
  const classes = useStyles();

  const publishHandler = (data) => {
    const proverbId = data.id
    const updateData = {
      content: data.content,
      category: [data.category[0].id],
      ethnic: data.ethnic.id,
      publish: !data.publish
    }
    UpdateProverb(updateData, proverbId, {updateType:'publish'})
  };

  const createAction = (data) => {
    setModal(!closeModal);
    CreateProverbAction(data);
  };

  return (
    <Page className={classes.root} title="Proverbs">
      <Box className={classes.tableField}>
        <Box className={classes.addProverb}>
          <Modal modalTitle="Add Proverb" closeModal={closeModal}>
            <CreateProverb
              classes={classes}
              CreateProverbAction={createAction}
            />
          </Modal>
        </Box>
        <Box className={classes.table}>
          {proverbs === null && loading  ? (
            <h1> Loading... </h1>
          ) : (
            <ProverbTable status
              proverbs={proverbs}
              publishHandler={(data) => publishHandler(data)}
              previewHandler={(id) => history.push(`/admin/proverbs/${id}`)}
              deleteHandler={(id) => DeleteProverb(id)}
            />
          )}
        </Box>
      </Box>
    </Page>
  );
};

ProverbTable.propTypes = {
  FetchProverb: PropTypes.func.isReqired,
  CreateProverbAction: PropTypes.func,
  proverbs: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  proverbs: state.proverbs,
});

export default connect(mapStateToProps, {
  FetchProverb,
  CreateProverbAction,
  DeleteProverb,
  ActivateProverb,
  UpdateProverb
})(Proverbs);
