import { useEffect } from "react";
import { fetchBlogs } from "../features/blogs/blogsThunk";
import { BlogItem } from "./BlogItem";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

export const BlogsList = () => {
  const dispatch = useAppDispatch();
  const { blogs } = useAppSelector(state => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div className="grid gap-4 mt-8 px-8 w-full"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}
    >
      {blogs.length > 0 
        && blogs.map((blog, index) => (
          <BlogItem blogData={blog} key={index} />
        ))
      }
    </div>
  );
};
