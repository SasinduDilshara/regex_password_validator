import React, { useState, useEffect } from "react";
import axios from 'axios'
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
import "./styles.css";

const serverUrl = "http://localhost:9090/";
const valid = "valid";
const invalid = "invalid"

function PasswordForm() {

  const [password, setPassword] = useState("");
  const [validLength, setValidLength] = useState(false);
  const [validCapital, setValidCapital] = useState(false);
  const [validSimple, setValidSimple] = useState(false);
  const [validNumber, setValidNumber] = useState(false);
  const [validSpecial, setValidSpecial] = useState(false);
  const [commonWords, setCommonWords] = useState(false);
  const [spaces, setSpaces] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function checkData() {
      await checkValidPasword();
    }
    checkData();
  }, [password, isSubmitted])

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

  const handlePasswordChange = async (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validPassword = validLength && validCapital && validSimple && validNumber 
          && validSpecial && commonWords && spaces;
    setSubmitted(validPassword);
  };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required autoComplete="off"/>
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="text" name="pass" required autoComplete="off" onChange={handlePasswordChange}/>
        </div>
        <div className="button-container">
          <input type="submit" disabled={!(validLength && validCapital && validSimple && validNumber 
          && validSpecial && commonWords && spaces)}/>
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

  return (
    <div className="PasswordForm">
      <div className="login-form">
        <div className="title">Sign Up</div>
        {isSubmitted ? <div>Account uccessfullt Creatred</div> : renderForm}
      </div>
    </div>
  );
}

export default PasswordForm;