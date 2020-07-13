import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

export const PostItem = ({ post }) => {
  const classes = useStyles();

  return (
    <Card
      style={{
        margin: "20px 0 20px 0",
        boxShadow: "0px 0px 48px -12px rgba(0,0,0,0.54)",
      }}
    >
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.title}
        subheader={moment(post.createdAt).format("LLLL")}
      />
      {post.image ? (
        <CardMedia
          className={classes.media}
          image={post.image}
          title="image posts"
        />
      ) : null}

      <CardContent>
        <Typography variant="body2" component="p">
          {post.content}
        </Typography>
      </CardContent>
    </Card>
  );
};
