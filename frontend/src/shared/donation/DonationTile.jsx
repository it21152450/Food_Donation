import { Box, Collapse, IconButton, Stack, Typography } from '@mui/material'
import React, { useContext } from 'react'
import moment from 'moment'
import { DonationStatusClient } from '../../constant/Donation';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { AppContext } from '../../context/AppContext';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
}));

const DonationTile = ({donation}) => {
    const {navigate} = useContext(AppContext);
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

  return (
    <Box p={1} boxShadow={2}>
        <Box display="flex" justifyContent="space-between">
            <Box>
                <Typography fontSize={14} fontWeight={600}>{`Donation ID: ${donation.id}`}</Typography>
                {/* <Typography fontSize={16} fontWeight={500}>{donation.description}</Typography> */}
                <Typography fontSize={12} fontWeight={500}>{donation.address}</Typography>
                <Typography fontSize={12} fontWeight={500}>{`Donation Date: ${moment(donation.date).format("MMMM Do YYYY")}`}</Typography>
            </Box>
            <Box>
                <IconButton onClick={()=>navigate({
                    name:"/donation-form",
                    params:{
                        donationId:donation.id
                    }
                })}>
                    <BorderColorIcon />
                </IconButton>
            </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
            <Typography fontSize={14} fontWeight={500}>{`Status: ${DonationStatusClient[donation.status]}`}</Typography>
            <Typography fontSize={12}>{moment(donation.createdAt).format("MMMM Do YYYY")}</Typography>
        </Box>
        {donation.donationItems && (
            <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography fontWeight={600}>Food Items</Typography>
                    <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    >
                    <ExpandMoreIcon />
                    </ExpandMore>
                </Box>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {donation.donationItems.map((item) => (
                        <Box key={item.id}>
                            <Typography>{`${item.quantity} - ${item.name}`}</Typography>
                        </Box>
                    ))}
                </Collapse>
            </Box>
        )}
    </Box>
  )
}

export default DonationTile