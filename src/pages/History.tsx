import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import axios from "axios";
import Modal from "./Modal";

function History() {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [term, setTerm] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const ACCESS_KEY = "DEo6AjzIBHHp0gnioVZUF05O2S6EgzgNjcDjayK6lps";
  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);
  const handleSearch = (term: string) => {
    // event.preventDefault();
    setTerm(term);
    const nextPage = Math.ceil(images.length / 20) + 1;

    axios
      .get("https://api.unsplash.com/search/photos", {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
        params: {
          query: term,
          per_page: 20,
          page: nextPage,
        },
      })
      .then((response) => {
        const newImages = response.data;
        setImages([...images, ...newImages.results]);
        // setImages(() => response.data.results);

        // console.log("Photos with search term:", searchedImages);
      })
      .catch((error) => {
        console.error("Error fetching photos with search term:", error);
      });
    //save search term to the local storage
  };
  function debounce(func: () => void, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout>;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };
  }
  window.addEventListener(
    "scroll",
    debounce(() => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        handleSearch(term);
      }
    }, 500)
  );
  // console.log(term);
  const openModal = (image: any) => {
    setModalImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    console.log("close");

    setModalImage("");
    setModalOpen(false);
  };
  return (
    <div>
      <Navigation />
      {modalOpen && <Modal image={modalImage} closeModal={closeModal} />}
      <h1>Search History</h1>
      <div className="searched-terms">
        {" "}
        {searchHistory.length != 0 ? (
          searchHistory.map((term, index) =>
            term.length != 0 ? (
              <h4
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleSearch(term);
                }}
                key={index}
              >
                {term}
              </h4>
            ) : null
          )
        ) : (
          <h4>No search history</h4>
        )}
      </div>

      <div className="image-container">
        {images?.map((image) => {
          // console.log(image);

          return (
            <img
              onClick={() => openModal(image)}
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

export default History;
