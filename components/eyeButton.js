'use client'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {useState} from 'react';

export default function EyeButton({passwordID}) {
  let [isPasswordVisible, setIsPasswordVisible] = useState(false);
  let handelEyeClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
    let password = document.getElementById(passwordID);
    if (isPasswordVisible) {
      password.type = 'password';
    } else {
      password.type = 'text';
    }
  }

  return (
    <>
      <button type="button"
      className="align-middle p-3 border rounded-none rounded-br-md hover:bg-white hover:text-black"
      onClick={handelEyeClick}>
        <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
      </button>
    </>
  );
}