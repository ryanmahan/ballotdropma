import { v4 as uuidv4 } from "uuid";

export default () => {
  const session = localStorage.getItem("sess")
  
  if (session) return session;
  else {
    const session = uuidv4();
    localStorage.setItem("sess", session);
    return session;
  }
}