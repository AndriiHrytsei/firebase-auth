import { useEffect, useState } from "react";
import { auth, db, storage } from "../config/firebase";
import "./App.css";
import Auth from "./auth";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [newReceivedAnOscar, setNewReceivedAnOscar] = useState(false);
  const movieCollectionRef = collection(db, "movies");

  const [updatedTitle, setUpdatedTitle] = useState("");

  const [fileUpload, setFileUpload] = useState(null)

  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredDate = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredDate);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: newReceivedAnOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
    getMovieList();
  };

  const uploadFile = async () => {
    if (!fileUpload) return
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload)
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div>Firebase auth</div>
      <Auth />
      <div>
        <input
          type="text"
          placeholder="Movie title..."
          onChange={(e) => setNewMovieTitle(e.currentTarget.value)}
        />
        <input
          type="number"
          placeholder="Release date..."
          onChange={(e) => setNewReleaseDate(Number(e.currentTarget.value))}
        />
        <input
          type="checkbox"
          id="receivedAnOscar"
          checked={newReceivedAnOscar}
          onChange={(e) => setNewReceivedAnOscar(e.currentTarget.checked)}
        />
        <label htmlFor="receivedAnOscar">Received an Oscar</label>
        <button type="button" onClick={onSubmitMovie}>
          Submit movie
        </button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "black" }}>
              {movie.title}
            </h1>
            <p>Release date: {movie.releaseDate}</p>
            <button type="button" onClick={() => deleteMovie(movie.id)}>
              Delete movie
            </button>
            <input
              type="text"
              placeholder="New title..."
              onChange={(e) => setUpdatedTitle(e.currentTarget.value)}
            />
            <button type="button" onClick={() => updateMovieTitle(movie.id)}>
              Update title
            </button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.currentTarget.files[0])}/>
        <button type="button" onClick={uploadFile}>Upload file</button>
      </div>
    </>
  );
}

export default App;
