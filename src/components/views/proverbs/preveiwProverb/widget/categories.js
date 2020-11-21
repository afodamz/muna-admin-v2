import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import ClearIcon from '@material-ui/icons/Clear';
import { Box } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    "& svg": {
      marginLeft: theme.spacing(0.8),
      color: theme.palette.secondary.main
    },
    "& div": {
      background: theme.palette.background.dark,
      fontWeight: theme.typography.fontWeightMedium,
      border: "1px solid #546e7a",
      cursor: 'pointer'

    }
  }
}))

const defaultProps = {
  px: 1,
  py: 0.4,
  borderRadius:16,
  display:'flex',
  mb:2,
  mr:2,
  boxShadow:1,
}

const Categories = ({categories}) => {
  const classes = useStyle()
  return (
    <Box className={classes.root} display='flex'>
        {categories.lenght !== 0?
          categories.map(category=>(
            <Box {...defaultProps} key={category}>
              {category.name} 
              <ClearIcon/>
            </Box>
          )) : (
            <span> No category present </span>
          )
        }
    </Box>
  );
};

export default Categories;