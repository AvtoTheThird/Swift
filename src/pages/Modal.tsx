import axios from "axios";
import React, { useEffect, useState } from "react";

function Modal({ image, closeModal }: any) {
  const [statistics, setStatistics] = useState<any>({});
  const ACCESS_KEY = "DEo6AjzIBHHp0gnioVZUF05O2S6EgzgNjcDjayK6lps";

  const photoId = image.id;
  useEffect(() => {
    axios
      .get(`https://api.unsplash.com/photos/${photoId}/statistics`, {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
      })
      .then((response) => {
        const statistics = response.data;
        setStatistics(statistics);
      })
      .catch((error) => {
        console.error("Error fetching photo statistics:", error);
      });
  }, []);
  // console.log(statistics);

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={closeModal}>
          X
        </span>
        <div className="image-info">
          <div>{<img className="image" src={image.urls.regular} alt="" />}</div>
          <div className="image-data">
            <h2>views:{statistics.views?.total}</h2>
            <h2>downloads:{statistics.downloads?.total}</h2>
            <h2>likes: {image.likes}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
