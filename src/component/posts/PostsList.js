/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import posts from "../../api/posts";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";
import { useHistory } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import { PostItem } from "./PostItem";
import "./addPosts.css";
import { Box, CircularProgress } from "@material-ui/core";

export const PostsList = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [dataApi, setDataApi] = useState({
    posts: [],
    totalPages: 0,
    page: 0,
    loading: true,
  });
  const [page, setPage] = useState(1);
  const history = useHistory();

  const retrieveData = async () => {
    const payload = {
      page,
      title: "",
      content: "",
    };
    const token = user.access_token;
    try {
      const {
        data: { data: allData },
      } = await posts.get(payload, token);
      setDataApi({
        posts: allData.posts,
        totalPages: allData.totalPages,
        loading: false,
      });
    } catch (error) {
      setDataApi({
        ...dataApi,
        loading: !dataApi.loading,
      });
      if (error.response?.data.message === "jwt expired") {
        dispatch({
          type: types.expired,
          payload: {
            access_token: "",
            userId: "",
          },
        });
        history.replace("/login");
      }
    }
  };

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    retrieveData();
  }, [page]);

  return (
    <div className="container">
      {dataApi.loading ? (
        <div className="text-center mt-4">
          <CircularProgress size={50} />
        </div>
      ) : (
        <>
          {dataApi.posts.length !== 0 ? (
            dataApi.posts.map((post, index) => (
              <PostItem key={index} post={post} />
            ))
          ) : (
            <Box fontSize="h6.fontSize" m={2}>
              Not found posts by user
            </Box>
          )}
          <Pagination count={dataApi.totalPages} onChange={handleChangePage} />
        </>
      )}
    </div>
  );
};
