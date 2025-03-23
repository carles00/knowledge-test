import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Dog, DogState } from "../types/dog";

export const fetchDogBreeds = createAsyncThunk("dogBreeds", async () => {
  //get all dog breedss
  const breeds = await fetch("https://dog.ceo/api/breeds/list/all")
    .then((res) => res.json())
    .then((t) => Object.keys(t['message']));

  let dogs: Dog[] = []  

  //get the images for each dog breed
  await Promise.all(breeds.map(async (breed) => {
    const numberOfImages = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
      .then(res => res.json())
      .then(message => (message['message'] as any[]).length);
    dogs.push({breed: breed, nImages: numberOfImages})
  }))

  dogs = dogs.sort((a, b) => {
    if(a.nImages >= b.nImages){
      return -1
    }else{
      return 1
    }
  });
  
  return dogs;
});

const initialState: DogState = {
  dogs: [],
  status: "idle",
};

export const dogSlice = createSlice({
  name: "dogs",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchDogBreeds.pending, (state)=>{
      state.status = 'pending'
    })

    builder.addCase(fetchDogBreeds.fulfilled, (state, action)=>{
      state.status = 'succeeded'
      state.dogs = [...action.payload] 

    })
  }
});

export default dogSlice.reducer;
export const selectAllDogs = (state: RootState) => state.dogs.dogs
export const selectDogStatus = (state: RootState) => state.dogs.status
