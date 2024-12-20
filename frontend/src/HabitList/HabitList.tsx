import { useEffect, useState } from "react";
import styles from "./list.module.scss"
import { Link } from "react-router";
import MesList from "./MesList";

type yo = {
    id: string,
    name: string,
    days: string,
    completedToday: boolean,
}

type mes = {
    id: string,
    name: string,
    target: number,
    unit: string,
    days: string,
    completedToday: number
}

function HabitList() {
    const [list, setList] = useState<[yo[], mes[], yo[]]>([[],[],[]])
    async function setCompleted(id: string, target: any){
        if(target.classList.contains(styles.completed)) return;

        target.classList.remove(styles.ncompleted)
        target.classList.add(styles.completed)
        target.innerText = "Completed"

        try{
            let req = await fetch("/api/yo_done", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id})
            });
    
            console.log(req)
          } catch (err) {
            console.log(err)
          }
    }

    useEffect(() => {
        fetch("/api/habits")
        .then(res => res.json())
        .then(text => {
            setList(text)
        })
    }, [])

    console.log(list)
    console.log(list[0].length > 0 || list[1].length > 0)
    if(list[0].length == 0 && list[1].length == 0 && list[2].length == 0) {
        return (<h1 className={styles.info}>No habits to show</h1>)
    }
    return ( 
        <div className={styles.list}>
            {list[0].length > 0 && <div className={styles.yo}>
                {list[0].map(el => <div className={styles.yoel} key={el.id}>
                    <div className={styles.name}><Link to={`/overview/${el.id}`}>{el.name}</Link></div>

                    <div className={styles.every}>
                        <div className={el.days[0] === "1" ? styles.selected : ""}>M</div>
                        <div className={el.days[1] === "1" ? styles.selected : ""}>T</div>
                        <div className={el.days[2] === "1" ? styles.selected : ""}>W</div>
                        <div className={el.days[3] === "1" ? styles.selected : ""}>T</div>
                        <div className={el.days[4] === "1" ? styles.selected : ""}>F</div>
                        <div className={el.days[5] === "1" ? styles.selected : ""}>S</div>
                        <div className={el.days[6] === "1" ? styles.selected : ""}>S</div>
                    </div>
                    <div className={`${el.completedToday ? styles.completed : styles.ncompleted}`} onClick={ev => setCompleted(el.id, ev.target)}>{el.completedToday ? "Completed" : "Not Completed"}</div>
                </div>)}

            </div>}
            {list[1].length !== 0 && <div className={styles.mes}>
                {list[1].map(el => <MesList {...el}/>)}
            </div>}
            <div className={styles.disabled}>
            {list[2].length > 0 && <div className={styles.yo}>
                {list[2].map(el => <div className={styles.yoel} key={el.id}>
                    <div className={styles.name}><Link to={`/overview/${el.id}`}>{el.name}</Link></div>
                    <div className={styles.every}>
                        <div className={el.days[0] === "1" ? styles.selected : ""}>M</div>
                        <div className={el.days[1] === "1" ? styles.selected : ""}>T</div>
                        <div className={el.days[2] === "1" ? styles.selected : ""}>W</div>
                        <div className={el.days[3] === "1" ? styles.selected : ""}>T</div>
                        <div className={el.days[4] === "1" ? styles.selected : ""}>F</div>
                        <div className={el.days[5] === "1" ? styles.selected : ""}>S</div>
                        <div className={el.days[6] === "1" ? styles.selected : ""}>S</div>
                    </div>
                    <div className={styles.ncompleted}>Not Completed</div>
                </div>)}
            </div>}
            </div>
        </div>
     );
}

export default HabitList;