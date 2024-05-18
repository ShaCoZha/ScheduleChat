import React, { useState } from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import {Link} from 'react-router-dom'
import axios from 'axios';
import { ScrollRestoration, useNavigate } from 'react-router-dom';
import styles from './registerFormStyle.module.css';

function Register() {
  const navigate = useNavigate();
  var passwordRegex = /^[a-zA-Z0-9_-]{6,20}$/;
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegister = async () => {
    try {

      handleUserNameError()
      handleEmailError()
      handlePasswordError()
      handlePasswordConfError()
  
      if(username==" " || username.length<4)
      {
        window.alert("Please enter a user name");
          return;
      }
  
      if(!emailRegex.test(email)) {
        window.alert("Invalid email address.");
        return;
      }
  
      if(!passwordRegex.test(password))
      {
        window.alert("Password must be between 6 to 20 characters long and contain only letters, numbers, underscores, or hyphens");
        return;
      }
  
      if(password !== 
        passwordConf) {
          window.alert("Passwords don't match. Please enter the same password in both fields.");
          return;
        }
  
      if(displayName == "")
      {
        window.alert("Please enter a display name");
          return;
      }
  
      if(year == "Select")
      {
        window.alert("Please select a year");
          return;
      }
  
      if(department == "Select")
      {
        window.alert("Please select a department");
          return;
      }
  
      if(major == "")
      {
        window.alert("Please enter an major");
          return;
      }
  
      const response = await axios.post('http://localhost:3000/user/createUser', {
        email: email,
        name: username,
        password: password,
        displayName: displayName,
        year: year,
        department : department,
        major : major,
        role: "user"
      });
  
      navigate('/login');
  
    } catch (error) {
      if (error.response && error.response.status === 400) {
        window.alert('User already exist');
      } 
      else {
        console.log(error);
        window.alert('An error occurred. Please try again later.');
      }
    }
  

  };

  const handleUserNameError = () => {
    if(username==" " || username.length<4)
      {
        setUsernameError('Username needs to be four characters or more');
      }
      else
      {
        setUsernameError('')
      }
  };

  const handleEmailError = () => {
    if(!emailRegex.test(email))
      {
        setEmailError('Invalid email address.');
      }
      else
      {
        setEmailError('')
      }
  };

  const handlePasswordError = () => {
    if(!passwordRegex.test(password))
      {
        setPasswordError('Password must be between 6 to 20 characters long and contain only letters, numbers, underscores, or hyphens.');
      }
      else
      {
        setPasswordError('')
      }
  };

  const handlePasswordConfError = () => {
    if(password !== 
      passwordConf)
      {
        setPasswordConfError("Passwords don't match.");
      }
      else
      {
        setPasswordConfError('')
      }
  };

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [year, setYear] = useState('')
  const [department, setDepartment] = useState('')
  const [major, setMajor] = useState('')

  const [usernameError, setUsernameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordConfError, setPasswordConfError] = useState('')

  return (
    
  <body>

    <div className={styles.signUp}> 
            <h2><label className={styles.word}>Sign Up</label></h2> 
       
            <div className={styles.form}> 
       
             <div className={styles.inputBox}> 
              <label className={styles.word}><b>Username</b></label>
              <input type="text" 
              id={styles.username} 
              placeholder='Username'
              onFocus={handleUserNameError}
              value = {username}
              onChange={(e) => setUsername(e.target.value)} 
              onKeyUp={handleUserNameError}
              required></input>
              {usernameError && <p className={styles.alert}>{usernameError}</p>}
             </div> 

             <div className={styles.inputBox}> 
              <label className={styles.word}><b>Email</b></label>
              <input type="text" 
              id={styles.email} 
              placeholder='Email'
              onFocus={handleEmailError}
              onKeyUp={handleEmailError}
              value = {email} 
              onChange={(e) => setEmail(e.target.value)}
                required></input>
                {emailError && <p className={styles.alert}>{emailError}</p>}
            </div> 
       
             <div className={styles.inputBox}> 
               <label className={styles.word}><b>Password</b></label>
              <input type="password" id={styles.password}
               value = {password} 
               placeholder='Password'
               onChange={(e) => setPassword(e.target.value)}
               onFocus={handlePasswordError}
              onKeyUp={handlePasswordError}
              required title="Password must be between 6 to 20 characters long and contain only letters, numbers, underscores, or hyphens">
              </input>
              {passwordError && <p className={styles.alert}>{passwordError}</p>}
             </div>      

             <div className={styles.inputBox}> 
              <label className={styles.word}><b>Confirm Password</b></label>
             <input type="password" 
             id={styles.confirmPassword} 
             placeholder='Confirm Password'
             value = {passwordConf} 
             onChange={(e) => setPasswordConf(e.target.value)}
             onFocus={handlePasswordConfError}
              onKeyUp={handlePasswordConfError}
             required></input>
             {passwordConfError && <p className={styles.alert}>{passwordConfError}</p>}
            </div> 
       
            <div className={styles.inputBox}> 
              <label className={styles.word}><b>Display Name</b></label>
              <input name="text" 
              id={styles.displayName} 
              value = {displayName} 
              placeholder='Display Name'
              onChange={(e) => setDisplayName(e.target.value)}
              required></input>
            </div> 

            <div className={styles.dropdown}> 
             <label className={styles.word}><b>Year</b></label>
            <select name="text" id={styles.year} value = {year} onChange={(e) => setYear(e.target.value)}
            required>
              <option value={styles.Select}>Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5+">5+</option>
              <option value="Graduate">Graduate</option>
            </select>
           </div> 

           <div className={styles.dropdown}> 
             <label className={styles.word}><b>Department</b></label>
            <select name="text" id={styles.department} value = {department} onChange={(e) => setDepartment(e.target.value)}
            required>
              <option value="Select">Select</option>
              <option value="Arts">Arts</option>
              <option value="Biological Sciences">Biological Sciences</option>
              <option value="Business">Business</option>
              <option value="Education">Education</option>
              <option value="Engineering">Engineering</option>
              <option value="Humanities">Humanities</option>
              <option value="Information & Computer Sciences">Information & Computer Sciences</option>
              <option value="Interdisciplinary Studies">Interdisciplinary Studies</option>
              <option value="Law">Law</option>
              <option value="Physical Sciences">Physical Sciences</option>
              <option value="Social Ecology">Social Ecology</option>
              <option value="Social Sciences">Social Sciences</option>
            </select>
           </div> 

           <div className={styles.inputBox}> 
             <label className={styles.word}><b>Major</b></label>
            <input type="text" 
            id="major" 
            value = {major} 
            placeholder='Major'
            onChange={(e) => setMajor(e.target.value)}
            required></input>
           </div> 
           
       
             <div className={styles.registerButton}> 
              <button type={styles.submit} onClick={() => handleRegister()}>Register</button>
             </div> 
       
            </div> 
       </div> 

  </body>

  )
}

export default Register
