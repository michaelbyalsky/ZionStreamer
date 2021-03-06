import React, { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import Artist from "./Artist/Artist";
import { read } from "../../helpers/ajax";

export default function Albums() {
  const [artistsData, setArtistsData] = useState(null);

  useEffect(() => {
    read("/api/v1/artists/all")
      .then((result) => {
        setArtistsData(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <>
      <div className="main">
        <div className="sideBar">
          <SideBar />
        </div>
        <div className="albumWrapper">
          {artistsData &&
            artistsData.map((artistData, index) => {
              return (
                <Artist
                  key={index}
                  artistsData={artistsData}
                  setArtistsData={setArtistsData}
                  artistData={artistData}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
