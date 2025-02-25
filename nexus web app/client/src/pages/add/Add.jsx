import React, { useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import upload from "../../utils/upload";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (gig) => {
      try {
        const response = await newRequest.post("/gigs", gig);
        return response.data; 
      } catch (error) {
        console.error("Error posting gig:", error);
        throw error; 
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["mygigs"]);
    },
    onError: (error) => {
      console.error("Mutation error:", error); // Handle mutation errors
    },
  });
  

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/gigs?search=");
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Event</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Event Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Full Stack Development Workshop"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
            <option value="select">Select</option>
              <option value="event">Event</option>
              <option value="workshop">Workshop</option>
              <option value="skill trade">Skill Trade</option>
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>
            <label htmlFor="">Description about the event</label>
            <textarea
              name="desc"
              id=""
              placeholder="Workshop conducted by Tech Club REC"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit}>Add</button>
          </div>
          <div className="details">
            <label htmlFor="">Event Location</label>
            <input
              type="text"
              name="delLocation"
              placeholder="Indoor Auditorium"
              onChange={handleChange}
            />
            <label htmlFor="">Date</label>
            <input type="string" name="deliveryTime" onChange={handleChange} />
            {/* <label htmlFor="">Quantity</label>
            <input type="text" onChange={handleChange} name="price" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
