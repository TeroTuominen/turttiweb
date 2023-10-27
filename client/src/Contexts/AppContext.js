import { createContext } from "react";

const AppContext = createContext({
    user: null, // User is null by default because we don't know if the user is logged in or not
    setUser: () => {}
});

export default AppContext;