import { useState } from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";

const SignUp = () => {

  // ---------------------------- STATE ----------------------------

  const [loginPage, setLoginPage] = useState(true);

  // ---------------------------- FUNCTIONS ----------------------------

  const changePageComponent = (value) => {
    setLoginPage(value);
  };

  // ---------------------------- JSX ----------------------------

  return (
    <div>
      {loginPage ? (
        <div>
          <Login changePage={changePageComponent} />
        </div>
      ) : (
        <Register changePage={changePageComponent} />
      )}

    </div>
  );
};

// ---------------------------- EXPORT ----------------------------

export default SignUp;
