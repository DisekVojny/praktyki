import { useRef, useState } from "react";
import styles from "./login.module.scss"
import { FaEye, FaEyeSlash, FaRegUser } from "react-icons/fa";
import { Link } from "react-router";

function Register() {
    const [vis, setVis] = useState(false);
    const [vis2, setVis2] = useState(false);
    const [message, setMessage] = useState("")
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const password2Ref = useRef<HTMLInputElement>(null)
    
    async function handleSubmit() {
        if (!/^[^\s]{4,20}$/.test(usernameRef.current?.value || "")) {
          setMessage("Login musi mieć od 4 do 20 znaków, nie może zawierać spacji");
          return;
        }
        else if (!/^[^\s]{7,20}$/.test(passwordRef.current?.value || "")) {
          setMessage("Hasło musi mieć od 7 do 20 znaków, nie może zawierać spacji");
          return;
        } 
        else if ((passwordRef.current?.value || "") !== (password2Ref.current?.value || "")) {
          setMessage("Hasła nie są identyczne");
          return;
        } 
        setMessage("");

        const username = usernameRef.current?.value
        const password = passwordRef.current?.value
        
        try{
          let req = await fetch("/register", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
          });
      
          if(req.status == 200){window.location.replace("/");; return}
          setMessage(await req.text())
        } catch (err) {
          console.log(err)
        }
      }

      window.addEventListener("keydown", ev => {
        if(ev.key !== "Enter") return;
        handleSubmit()
      })

    return (
<div className={`main ${styles.login} ${styles.form}`}>
    <div className={`${styles.title}`}>Register</div>
    <div className={styles.line}>
        <FaRegUser/>
        <input type="text" placeholder="Username" ref={usernameRef}/>
    </div>
    <div className={styles.line}>
        <div className={styles.icon} onClick={() => setVis(!vis)}>{vis ? <FaEye/> : <FaEyeSlash/>}</div>
        <input type={vis ? "text" : "password"} placeholder="Password" ref={passwordRef}/>
    </div>
    <div className={styles.line}>
        <div className={styles.icon} onClick={() => setVis2(!vis2)}>{vis2 ? <FaEye/> : <FaEyeSlash/>}</div>
        <input type={vis2 ? "text" : "password"} placeholder="Repeat password" ref={password2Ref}/>
    </div>
    <div className={`${styles.line} ${styles.warning}`}>{message}</div>
    <div className={styles.buttons}>
        <Link to="/login">Masz juz konto? zaloguj sie tutaj</Link>
        <div className={styles.button} onClick={handleSubmit}>Zaloguj się</div>
    </div>
</div>
    );
}

export default Register;