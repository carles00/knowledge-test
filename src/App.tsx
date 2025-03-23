import { useEffect } from "react";
import { fetchDogBreeds, selectAllDogs, selectDogStatus } from "./Api/dogSlice";
import DogBreedPie from "./components/DogBreedPie";
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
    <>
      <p>Percentage of images for each Breed</p>
      <DogBreedPie dogBreeds={dogBreeds} />
    </>
  );
}
