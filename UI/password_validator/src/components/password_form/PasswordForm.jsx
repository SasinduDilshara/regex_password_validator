import React, { useState, useEffect } from "react";
import {
  checkAtLeastOneNumberAPI, checkAtLeastOneCapitalLetterAPI,
  checkAtLeastFourSimpleLettersAPI, checkCommonWordsAPI, checkPasswordLengthAPI,
  checkSpecialCharactersAPI, checkSpacesAPI
} from '../../constants/api/constants'
import {
  passwordLengthMessage,
  capitalLetterMessage,
  simpleLetterMessage,
  numberMessage,
  specialCharacterMessage,
  commonWordMessage,
  spaceMessage
} from '../../constants/messages/constants';
import "./Form.css";
import axios from 'axios'

const serverUrl = "http://localhost:9090/";
const valid = "valid";
const invalid = "invalid"

const PasswordForm = () => {
  const [password, setPassword] = useState("");
  const [validLength, setValidLength] = useState(false);
  const [validCapital, setValidCapital] = useState(false);
  const [validSimple, setValidSimple] = useState(false);
  const [validNumber, setValidNumber] = useState(false);
  const [validSpecial, setValidSpecial] = useState(false);
  const [commonWords, setCommonWords] = useState(false);
  const [spaces, setSpaces] = useState(false);

  useEffect(() => {
    async function checkData() {
      await checkValidPasword();
    }
    checkData();
  }, [password])

  const checkValidPasword = async () => {
    try {
      const res1 = await axios.post(serverUrl + checkPasswordLengthAPI, { password: password });
      setValidLength(res1.data.body);

      const res2 = await axios.post(serverUrl + checkAtLeastOneCapitalLetterAPI, { password: password });
      setValidCapital(res2.data.body);

      const res3 = await axios.post(serverUrl + checkAtLeastFourSimpleLettersAPI, { password: password });
      setValidSimple(res3.data.body);

      const res4 = await axios.post(serverUrl + checkAtLeastOneNumberAPI, { password: password });
      setValidNumber(res4.data.body);

      const res5 = await axios.post(serverUrl + checkSpecialCharactersAPI, { password: password });
      setValidSpecial(res5.data.body);

      const res6 = await axios.post(serverUrl + checkCommonWordsAPI, { password: password });
      setCommonWords(res6.data.body);

      const res7 = await axios.post(serverUrl + checkSpacesAPI, { password: password });
      setSpaces(res7.data.body);
    } catch (e) {
      alert(e);
    }
  }

  const handleChange = async (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="password-form-container">
      <form className="password-form">
        <div className="form-control">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input type="text" id="password" name="password" onChange={handleChange} required autoComplete="off" />
        </div>
      </form>
      <div className="password-strength">
        <p>Password Strength:</p>
        <ul>
          <li className={validLength ? valid : invalid}>{passwordLengthMessage}</li>
          <li className={validCapital ? valid : invalid}>{capitalLetterMessage}</li>
          <li className={validSimple ? valid : invalid}>{simpleLetterMessage}</li>
          <li className={validNumber ? valid : invalid}>{numberMessage}</li>
          <li className={validSpecial ? valid : invalid}>{specialCharacterMessage}</li>
          <li className={commonWords ? valid : invalid}>{commonWordMessage}</li>
          <li className={spaces ? valid : invalid}>{spaceMessage}</li>
        </ul>
      </div>
    </div>
  );
};

export default PasswordForm;
