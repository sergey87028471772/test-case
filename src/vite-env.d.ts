/// <reference types="vite/client" />
export type MockDataItem = {
  Id: number;
  Name: string;
  Image: string;
  Type: "Image" | "Video";
  createdDate: Date;
};
