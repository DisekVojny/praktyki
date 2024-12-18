import { useRef, useState } from "react";
import styles from "./login.module.scss"
import { FaEye, FaEyeSlash, FaRegUser } from 'react-icons/fa';
import { Link } from "react-router";

function Login() {
    const [vis, setVis] = useState(false);
    const [message, setMessage] = useState("")
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    async function handleSubmit(){
        if (!/^[^\s]{4,20}$/.test(usernameRef.current?.value || "")) {
            setMessage("Username must have between 4 and 20 characters");
            return;
          }
        else if (!/^[^\s]{7,20}$/.test(passwordRef.current?.value || "")) {
            setMessage("Password must have between 7 and 20 characters, spaces are forbidden");
            return;
        } 
        setMessage("");

        const username = usernameRef.current?.value
        const password = passwordRef.current?.value



        try{
            let req = await fetch("/login", {
              method: "POST",
              headers: {'Content-Type': 'application/json'},
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
    <div className={`${styles.title}`}>Log in</div>
    <div className={styles.line}>
        <FaRegUser/>
        <input type="text" placeholder="Username" ref={usernameRef}/>
    </div>
    <div className={styles.line}>
        <div className={styles.icon} onClick={() => setVis(!vis)}>{vis ? <FaEye/> : <FaEyeSlash/>}</div>
        <input type={vis ? "text" : "password"} placeholder="Password" ref={passwordRef}/>
    </div>
    <div className={`${styles.line} ${styles.warning}`}>{message}</div>
    <div className={styles.buttons}>
        <Link to="/register">Nie masz konta? Stwórz nowe tutaj!</Link>
        <div className={styles.button} onClick={handleSubmit}>Zaloguj się</div>
    </div>
</div>
    );
}

export default Login;