import React, { useState, Fragment } from "react";

import "tachyons";

const LambdaDemo = () => {
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState({ name: null, salary: null, age: null });

  console.log(user);

  const handleClick = (api) => (e) => {
    e.preventDefault();

    setLoading(true);
    fetch("/.netlify/functions/" + api)
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        setMessage(json.msg);
      });
  };

  const handlePost = (e) => {
    e.preventDefault();
    const data = {
      name: "tester",
      salary: "three fifty",
      age: 42,
    };
    fetch("/.netlify/functions/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setLoading(false);
        setUser(json.data);
      });
  };

  const userCard = () => {
    console.log(user.age);
    return (
      <Fragment>
        {" "}
        <h1>name {user.name}</h1>
        <h1>salary {user.salary}</h1>
        <h1>age {user.age}</h1>
      </Fragment>
    );
  };

  return (
    <p className="tc   ">
      <button onClick={handleClick("hello")}>{loading ? "Loading..." : "Call Lambda"}</button>
      <button onClick={handleClick("async-dadjoke")}>{loading ? "Loading..." : "Call Async Lambda"}</button>
      <button onClick={(e) => handlePost(e)}>{loading ? "Loading..." : "Call Post Lambda"}</button>
      <br />
      <span>{message}</span>
      <Fragment>{userCard()}</Fragment>
    </p>
  );
};

const App = () => {
  return (
    <div className="bg-pink vh-100 pa1">
      <LambdaDemo />
    </div>
  );
};

export default App;
