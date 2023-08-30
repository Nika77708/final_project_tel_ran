import { Outlet } from "react-router-dom";
import Contacts from "./components/Contacts/Contacts";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";

export const App = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>
        <Contacts />
        <Map />
      </footer>
    </>
  );
};
