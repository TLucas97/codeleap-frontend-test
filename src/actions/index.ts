import axios from 'axios';

const BASE_URL = 'https://dev.codeleap.co.uk';

interface Post {
  username: string;
  title: string;
  content: string;
}

export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/careers/`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMorePosts = async (page: number = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/careers/?limit=10&offset=${page}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostByUsername = async (username: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/careers/?username=${username}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const makePost = async (post: Post) => {
  try {
    const response = await axios.post(`${BASE_URL}/careers/`, post);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const editPost = async (post: Pick<Post, 'title' | 'content'>, object_id: number) => {
  try {
    const response = await axios.patch(`${BASE_URL}/careers/${object_id}/`, post);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (object_id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/careers/${object_id}/`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
