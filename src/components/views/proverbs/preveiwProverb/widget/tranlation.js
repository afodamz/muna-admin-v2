import React, { useState } from "react";
import {withRouter } from 'react-router'
import Proptypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { TableCell, TableRow } from "@material-ui/core";
import {
  Table as TableBody,
  MenuDropDown,
  Modal,
} from "../../../../UiElements";
import { UpdateForm } from "../widget";

const menuTitle = [
  {
    id: "1M",
    title: "Edit",
    modal: true,
    modalTitle: 'Create'
  },
  {
    id: "2M",
    title: "Delete",
  },
];

const tableHeader = [
  {
    id: 1,
    value: "S/N",
  },
  {
    id: 2,
    value: "Transaltion",
  },
  {
    id: 3,
    value: "Language",
  },
  {
    id: 4,
    title: "Status",
  },
];

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.common.black,
    padding: "5px 10px",
  },
  body: {
    fontSize: 14,
    padding: "4px 10px",
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
    border: "1px solid rgba(0,0,0,0.14);",
    "& span": {
      padding: theme.spacing(0.7, 2),
      borderRadius: "2px",
      color: "#f5f5f5",
      fontSize: "0.5rem",
      fontWeight: "bold",
      textTransform: "capitalize",
    },
  },
  mrgBtm: {
    marginBottom: theme.spacing(1),
  },
  published: {
    background: theme.palette.primary.main,
  },
  unpublished: {
    background: theme.palette.secondary.main,
  },
}));

const Tranlation = ({
  translation,
  publishHandler,
  editHandler,
  deleteHandler,
  createActionHandler,
  match
}) => {
  const [closeModal, setModal] = useState(false);
  const classes = useStyles();

  const createAction = (data, updateType = 'translation') => {
    setModal(!closeModal);
    createActionHandler({...data.formData, proverb: match.params.id}, updateType );
  };

  const UpdateTransaltion = (data, id) => {
    setModal(!closeModal);
    editHandler({...data, updateId: id, updateType:"translation"})
  }

  const ModalChildComponent = ({initialParams, id}) => {
    return (
      <> 
        <UpdateForm closeModal={closeModal} updateType="Translation" createAction={(data)=>UpdateTransaltion(data, id)} defaultValue={initialParams} />
      </>
    )
  }

  return (
    <>
      <TableBody
        className={classes.mrgBtm}
        tableHeader={tableHeader}
        actionField={true}
      >
        {translation.map((data, index) => (
          <TableRow key={data.id}>
            <StyledTableCell component="th" scope="data">
              {index + 1}
            </StyledTableCell>
            <StyledTableCell>{data.content}</StyledTableCell>
            <StyledTableCell>{data.language}</StyledTableCell>
            <StyledTableCell>
              <span
                className={
                  data.publish ? classes.published : classes.unpublished
                }
              >
                {data.publish ? "published" : "unpublished"}
              </span>
            </StyledTableCell>
            <StyledTableCell align="right">
              <MenuDropDown
              closeModal={closeModal}
                menuTitle={menuTitle}
                publish={data.publish}
                toggleState={true}
                publishHandler={() => publishHandler({ type: "translation" })}
                // previewHandler={() => alert('in production')}
                deleteHandler={() => deleteHandler(data.id, {updateType:'translation'})}
              >
                <ModalChildComponent initialParams={data} id={data.id} />
              </MenuDropDown>
            </StyledTableCell>
          </TableRow>
        ))}
      </TableBody>
      <Modal modalTitle="Add Translation" closeModal={closeModal}>
        <UpdateForm
          // CreateProverbAction={createAction}
          createAction={(data)=>createAction(data)}
          updateType="Translation"
        />
      </Modal>
    </>
  );
};

Tranlation.proptype = {
  translation: Proptypes.object.isRequired,
  tableHeader: Proptypes.object.isRequired,
};

export default withRouter(Tranlation);
