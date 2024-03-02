import axios from "axios";
import "./App.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import History from "./pages/History";
function App() {
  // const searchInput = useRef<any>("");
  // // const [searchInputValue, setSearchInputValue] = useState<any>("");
  // const [images, setImages] = useState<any[]>([]);
  // const [searchedImages, setSearchedImages] = useState<any[]>([]);
  // const [searchHistory, setSearchHistory] = useState([]);

  // const ACCESS_KEY = "DEo6AjzIBHHp0gnioVZUF05O2S6EgzgNjcDjayK6lps";
  // // load fotos on scroll down
  // function fetchNextImages() {
  //   axios
  //     .get("https://api.unsplash.com/photos", {
  //       headers: {
  //         Authorization: `Client-ID ${ACCESS_KEY}`,
  //       },
  //       params: {
  //         order_by: "likes",
  //         per_page: 20,
  //         page: Math.ceil(images.length / 20) + 1, // Calculate the next page number based on the current number of images
  //       },
  //     })
  //     .then((response) => {
  //       const newImages = response.data;
  //       setImages([...images, ...newImages]);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching next set of photos:", error);
  //     });
  // }
  // // debounce function
  // function debounce(func: () => void, delay: number) {
  //   let timeoutId: ReturnType<typeof setTimeout>;
  //   return () => {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(func, delay);
  //   };
  // }
  // // scroll listener
  // window.addEventListener(
  //   "scroll",
  //   debounce(() => {
  //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //       fetchNextImages();
  //     }
  //   }, 500)
  // );
  // // initial load
  // useEffect(() => {
  //   axios
  //     .get("https://api.unsplash.com/photos", {
  //       headers: {
  //         Authorization: `Client-ID ${ACCESS_KEY}`,
  //       },
  //       params: {
  //         order_by: "likes",
  //         per_page: 20,
  //       },
  //     })
  //     .then((response) => {
  //       setImages(response.data);
  //     });
  //   // load search history from local storage if it exists
  //   const savedHistory = localStorage.getItem("searchHistory");
  //   if (savedHistory) {
  //     setSearchHistory(JSON.parse(savedHistory));
  //   }
  // }, []);
  // const savedResultsMemoized = useMemo(() => {
  //   return searchHistory.reduce<any>((acc, term) => {
  //     const savedResults = localStorage.getItem(term);
  //     if (savedResults) {
  //       acc[term] = JSON.parse(savedResults);
  //     }
  //     return acc;
  //   }, {});
  // }, [searchHistory]);

  // // fech searched fotos
  // const handleSearch = (event: any) => {
  //   event.preventDefault();
  //   // debounce(setSearchInputValue(event.target.value), 300);
  //   // setSearchInputValue(event.target.value);
  //   axios
  //     .get("https://api.unsplash.com/search/photos", {
  //       headers: {
  //         Authorization: `Client-ID ${ACCESS_KEY}`,
  //       },
  //       params: {
  //         query: searchInput.current.value,
  //         per_page: 20,
  //       },
  //     })
  //     .then((response) => {
  //       setSearchedImages(() => response.data.results);

  //       // console.log("Photos with search term:", searchedImages);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching photos with search term:", error);
  //     });
  //   //save search term to the local storage

  //   const searchHistory = JSON.parse(
  //     localStorage.getItem("searchHistory") || "[]"
  //   );
  //   const updatedHistory = [...searchHistory, searchInput.current.value];
  //   localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  // };
  // // console.log(searchInputValue);

  return (
    <>
      <Routes>
        <Route path="/" Component={MainPage} />
        <Route path="/History" Component={History} />
      </Routes>
    </>

    // <div className="main-page">
    //   <input
    //     type="search"
    //     ref={searchInput}
    //     onChange={(e) => {
    //       handleSearch(e);
    //     }}
    //   />
    //   {searchInput.current.value !== "" ? (
    //     <h1>Search results for "{searchInput.current.value}"</h1>
    //   ) : (
    //     <h1>Latest photos</h1>
    //   )}

    //   <div className="image-container">
    //     {searchInput.current.value !== ""
    //       ? searchedImages?.map((image) => {
    //           // console.log(image);

    //           return (
    //             <img
    //               src={image.urls.regular}
    //               alt={image.alt_description}
    //               key={image.id}
    //             />
    //           );
    //         })
    //       : images?.map((image) => {
    //           // console.log(image);

    //           return (
    //             <img
    //               src={image.urls.regular}
    //               alt={image.alt_description}
    //               key={image.id}
    //             />
    //           );
    //         })}
    //   </div>
    // </div>
  );
}

export default App;
