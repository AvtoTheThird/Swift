import axios from "axios";
import "../App.css";
import { useEffect, useMemo, useRef, useState } from "react";
import Navigation from "./Navigation";
import Modal from "./Modal";
function MainPage() {
  const searchInput = useRef<any>("");
  const debouncedSearch = useRef<any>();

  const [images, setImages] = useState<any[]>([]);
  const [searchedImages, setSearchedImages] = useState<any[]>([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const ACCESS_KEY = "DEo6AjzIBHHp0gnioVZUF05O2S6EgzgNjcDjayK6lps";

  useEffect(() => {
    initialSearch();
    debouncedSearch.current = debounce(handleSearch, 500);
  }, []);
  function initialSearch() {
    const nextPage = Math.ceil(images.length / 20) + 1;

    axios
      .get("https://api.unsplash.com/photos", {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
        params: {
          order_by: "popular",
          per_page: 20,
          page: nextPage,
        },
      })
      .then((response) => {
        setImages(response.data);
      });
    // load search history from local storage if it exists
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }
  const openModal = (image: any) => {
    setModalImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    console.log("close");

    setModalImage("");
    setModalOpen(false);
  };
  // load fotos on scroll down
  function fetchNextImages() {
    const nextPage = Math.ceil(images.length / 20) + 1;

    axios
      .get("https://api.unsplash.com/photos", {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
        params: {
          order_by: "popular",
          per_page: 20,
          page: nextPage,
        },
      })
      .then((response) => {
        const newImages = response.data;
        setImages([...images, ...newImages]);
      })
      .catch((error) => {
        console.error("Error fetching next set of photos:", error);
      });
  }
  // scroll listener
  window.addEventListener(
    "scroll",
    debounce(() => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        fetchNextImages();
        searchInput.current.value == "" ? fetchNextImages() : handleSearch();
      }
    }, 500)
  );
  // debounce function
  function debounce(func: () => void, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout>;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };
  }

  const savedResultsMemoized = useMemo(() => {
    return searchHistory.reduce<any>((acc, term) => {
      const savedResults = localStorage.getItem(term);
      if (savedResults) {
        acc[term] = JSON.parse(savedResults);
      }
      return acc;
    }, {});
  }, [searchHistory]);

  // fech searched fotos
  const handleSearch = () => {
    const nextPage = Math.ceil(searchedImages.length / 20) + 1;

    axios
      .get("https://api.unsplash.com/search/photos", {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
        params: {
          query: searchInput.current.value,
          per_page: 20,
          page: nextPage,
        },
      })
      .then((response) => {
        const newImages = response.data.results;
        // console.log("newImages ", newImages);

        setSearchedImages([...searchedImages, ...newImages]);

        // console.log("Photos with search term:", searchedImages);
      })
      .catch((error) => {
        console.error("Error fetching photos with search term:", error);
      });
    //save search term to the local storage

    const searchHistory = JSON.parse(
      localStorage.getItem("searchHistory") || "[]"
    );
    // Save search term if it's not a duplicate

    if (!searchHistory.includes(searchInput.current.value)) {
      const updatedHistory = [...searchHistory, searchInput.current.value];
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }
  };

  return (
    <div className="main-page">
      {modalOpen && <Modal image={modalImage} closeModal={closeModal} />}

      <Navigation />

      <input
        type="search"
        ref={searchInput}
        onChange={() => {
          debouncedSearch.current();
        }}
      />
      {searchInput.current.value !== "" ? (
        <h1>Search results for "{searchInput.current.value}"</h1>
      ) : (
        <h1>Most Popoular Fotos</h1>
      )}
      <div className="image-container">
        {(searchInput.current.value !== "" ? searchedImages : images)?.map(
          (image) => (
            <img
              onClick={() => openModal(image)}
              src={image.urls.regular}
              alt={image.alt_description}
              key={image.id}
            />
          )
        )}
      </div>
    </div>
  );
}

export default MainPage;
