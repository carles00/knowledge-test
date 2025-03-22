import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface Dog {
  breed: string;
  nImages: number;
}

export interface DogState {
  dogs: Dog[];
  status: "idle" | "pending" | "succeeded" | "failed";
}

export const fetchDogBreeds = createAsyncThunk("dogBreeds", async () => {
  const breeds = await fetch("https://dog.ceo/api/breeds/list/all")
    .then((res) => res.json())
    .then((t) => Object.keys(t['message']));

  let dogs: Dog[] = []  

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
  }).filter((dog, index)=> index < 10);

  console.log(dogs)

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
      const dogsList = [...action.payload] 
      state.dogs = dogsList

    })
  }
});

export default dogSlice.reducer;
export const selectAllDogs = (state: RootState) => state.dogs.dogs
export const selectDogStatus = (state: RootState) => state.dogs.status
