export interface Dog {
  breed: string;
  nImages: number;
}

export interface DogState {
  dogs: Dog[];
  status: "idle" | "pending" | "succeeded" | "failed";
}