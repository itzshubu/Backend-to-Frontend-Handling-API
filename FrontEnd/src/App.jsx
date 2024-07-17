import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  // Uncomment the line below to enable the button for API calls
  // const [namee, setNamee] = useState("c")
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect runs when the component mounts or when 'name' or 'category' changes
  useEffect(() => {
    const controller = new AbortController();
    // AbortController helps cancel previous requests. Check the network tab to see how AbortController works.
    (async () => {
      try {
        setError(false);
        setLoading(true);
        // Uncomment the line below to enable the button for API calls
        // http://localhost:3000/api/products?name=${namee}&category=${category}
        let response = await axios.get(
          `http://localhost:3000/api/products?name=${name}&category=${category}`,
          {
            signal: controller.signal,
          }
        );
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
          return;
        }
        setError(true);
      }
    })();
    // Clean up the request when the component unmounts or before the next request
    return () => controller.abort();
    // Check the network tab to see how controller.abort() works
  }, [name, category]);

  // Uncomment the lines below to enable the button for API calls
  // const submit = (e) => {
  //   e.preventDefault();
  //   setNamee(name);
  // }

  return (
    <>
      <h1 className="text-center font-bold leading-9 text-2xl">
        Hello, my name is Shubham and this is the jsonplaceholder
      </h1>
      <div className="flex justify-center p-3">
        {/* Uncomment the line below to enable the form submission */}
        {/* <form onSubmit={submit}> */}
        <form>
          <input
            type="text"
            className="border bg-cyan-400 border-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* <button type="submit" className="mx-3 p-1 px-3 bg-cyan-300">Submit</button> */}
        </form>
      </div>
      {/* Display this message if there is an error */}
      {error && (
        <h1 className="text-center text-red-600 font-bold text-4xl">
          There was an error, please try again later
        </h1>
      )}

      {/* Display this message while loading */}
      {loading && (
        <h1 className="text-center text-red-600 font-bold text-4xl">
          Loading....
        </h1>
      )}

      <div className="container m-auto flex flex-wrap justify-evenly gap-3 xl:gap-y-5 sm:gap-y-6 my-3">
        {data.map((element) => {
          return (
            <div
              key={element.id}
              className="border border-black bg-cyan-200 p-3 text-xs w-[95%] sm:w-[47%] xl:w-[32%]"
            >
              <h1>ID :: {element.id}</h1>
              <h2>Name :: {element.name}</h2>
              <p>Category :: {element.category}</p>
              <p>Description :: {element.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
