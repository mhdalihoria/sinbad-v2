const { default: usePostFetch } = require("components/fetch/usePostFetch");
const { useState } = require("react");

const ConfirmCode = ({ token, setStage }) => {
    const [input, setInput] = useState("");
    const [error, setError] = useState("")
    const handleChange = (event) => {
      setInput(event.target.value);
      console.log(input)
    };
    const handleSubmit = async () => {
      const data = await usePostFetch(
        "https://sinbad-store.com/api/v2/activate",
        {
          "X-localization": "ar",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        JSON.stringify({ code: input })
      )
      console.log(data)
      if(data.success) setStage(2)
      if(!data.success) setError(data.message)
    }
    return (
      <div>
        <h2>Confirm Your Account</h2>
        {error !== "" && <h5 style={{color: "red"}}>{error}</h5>}
        <input
          type="text"
          placeholder="Activation code here"
          value={input}
          name={"input"}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
  };

  export default ConfirmCode