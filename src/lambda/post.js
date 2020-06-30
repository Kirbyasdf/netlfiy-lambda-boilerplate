import axios from "axios";
export async function handler(event, context) {
  const reqBody = JSON.parse(event.body).data;

  try {
    const data = {
      name: reqBody.name,
      salary: reqBody.salary,
      age: reqBody.age,
    };

    const options = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const response = await axios.post("	http://dummy.restapiexample.com/api/v1/create", data, options);

    const resData = response.data.data;

    return {
      statusCode: 200,
      body: JSON.stringify({ data: resData }),
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
