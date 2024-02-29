import React, { useEffect, useState } from "react";

function Test() {
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const [scrollCount, setScrollCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { innerHeight, scrollY } = window;
      const { clientHeight } = document.body;

      if (innerHeight + scrollY >= clientHeight && loadMore) {
        // Scrolled to the bottom and loadMore is true
        console.log("Scrolled to the bottom");
        setPage((prevPage) => prevPage + 1); // Increment the page value
        setScrollCount((prevCount) => prevCount + 1); // Increment the scroll count
        setLoadMore(false); // Disable further loading until components are loaded
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadMore]); // Listen to changes in loadMore

  // Simulate loading more components
  useEffect(() => {
    if (scrollCount > 0) {
      // Simulate loading delay
      setTimeout(() => {
        // Set loadMore to true after a delay to allow loading more components again
        setLoadMore(true);
      }, 1000); // Adjust loading delay as needed
    }
  }, [scrollCount]);

  return (
    <div>
      <h1>Current Page: {page}</h1>
      {/* Render components based on the current page value */}
      {/* You can load more components here */}
      <div style={{ height: "2000px" }}>
        {" "}
        {/* Just for demonstration */}
        {/* Placeholder for more content */}
      </div>
    </div>
  );
}

export default Test;
