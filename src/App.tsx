import { useEffect } from "react";
import "./App.css";
import { fetchDogBreeds, selectAllDogs, selectDogStatus } from "./Api/dogSlice";
import PieComponent from "./components/pieComponent";
import Loading from "./components/loading";
import { useAppDispath, useAppSelector } from "./hooks/reduxHooks";

export default function App() {
  const dispatch = useAppDispath();
  const dogBreeds = useAppSelector(selectAllDogs);
  const dogStatus = useAppSelector(selectDogStatus);

  useEffect(() => {
    if (dogStatus === "idle") {
      dispatch(fetchDogBreeds());
    }
  }, [dogStatus, dispatch]);

  if(dogStatus !== 'succeeded'){
    return <Loading/>
  }

  return (
    <main className="main">
      <PieComponent dogBreeds={dogBreeds} />
    </main>
  );
}
