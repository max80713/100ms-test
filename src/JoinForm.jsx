import { useState } from "react";
import { useHMSActions } from "@100mslive/react-sdk";

function JoinForm() {
  const hmsActions = useHMSActions();
  const [inputValues, setInputValues] = useState({
    userName: "",
    roomCode: "rll-rayp-uef"
  });

  const handleInputChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      userName = '',
      roomCode = '',
    } = inputValues

    // use room code to fetch auth token
    const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode })

    try {
      await hmsActions.join({ userName, authToken });
    } catch (e) {
      console.error(e)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Join Room</h2>
      <div className="input-container">
        <input
          required
          value={inputValues.userName}
          onChange={handleInputChange}
          id="user-name"
          type="text"
          name="userName"
          placeholder="Your name"
        />
      </div>
      <div className="input-container">
        <input
          required
          value={inputValues.roomCode}
          onChange={handleInputChange}
          id="room-code"
          type="text"
          name="roomCode"
          placeholder="Room code"
        />
      </div>
      <button className="btn-primary">Join</button>
    </form>
  );
}

export default JoinForm;
