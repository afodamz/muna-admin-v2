import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { Translation, Interpretation, Categories } from "../widget";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    background: theme.palette.text.secondary,
  },
}));

export default function SimpleTabs({
  titles,
  publishHandler,
  editHandler,
  deleteHandler,
  createActionHandler,
  content: { translation, interpretation, category },
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Tabs
          value={value}
          indicatorColor="secondary"
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {titles.map((title) => (
            <Tab key={title.value} label={title.value} {...a11yProps(title.id)} />
          ))}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Translation
          publishHandler={publishHandler}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
          translation={translation}
          createActionHandler={createActionHandler}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Interpretation
          interpretation={interpretation}
          publishHandler={publishHandler}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
          translation={translation}
          createActionHandler={createActionHandler}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Categories categories={category}/>
      </TabPanel>
    </div>
  );
}
