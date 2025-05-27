import { useContext } from "react";
import { StoreContext } from "../stores/Store";

export default function useStore() {
  return useContext(StoreContext)
}
