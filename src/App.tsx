import axios from "axios";
import "./App.css";
import { useEffect, useRef, useState } from "react";
function App() {
  const searchInput = useRef<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isScroledToBottom, setIsScrolledToBottom] = useState(false);
  const API_URL = "https://api.unsplash.com/search/photos";
  const IMAGES_PER_PAGE = 20;
  const ACCESS_KEY = "DEo6AjzIBHHp0gnioVZUF05O2S6EgzgNjcDjayK6lps";

  function debounce<T extends (...args: any[]) => any>(func: T, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  const handleScroll = debounce(() => {
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
      setIsScrolledToBottom(true);
    }
  }, 500);
  // console.log(isScroledToBottom);
  window.addEventListener("scroll", handleScroll);

  useEffect(() => {
    console.log("scroled to bottom " + pageNumber + " times");

    setPageNumber((prevnumber) => prevnumber + 1);
    // console.log(pageNumber);

    axios
      .get("https://api.unsplash.com/photos", {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
        params: {
          order_by: "likes",
          per_page: 20,
          page: pageNumber,
        },
      })
      .then((response) => {
        const newImages = response.data;
        setImages([...images, ...newImages]);
        setIsScrolledToBottom(false);

        // console.log("Most liked photos:", response.data);
      });
  }, [isScroledToBottom]);
  console.log(images);

  useEffect(() => {
    axios
      .get("https://api.unsplash.com/photos", {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
        params: {
          order_by: "likes",
          per_page: 20,
          page: 1,
        },
      })
      .then((response) => {
        // Handle the response data
        setImages(response.data);
        // console.log("Most liked photos:", response.data);
      });
    // setIsScrolledToBottom(false);
  }, []);

  const handleSearch = (event: any) => {
    event.preventDefault();
    if (searchInput.current) {
      console.log(searchInput.current.value);
    }
  };

  return (
    <div className="main-page">
      <input type="search" ref={searchInput} onChange={handleSearch} />
      <div className="image-container">
        {images?.map((image) => {
          // console.log(image);

          return (
            <img
              src={image.urls.regular}
              alt={image.alt_description}
              key={image.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
