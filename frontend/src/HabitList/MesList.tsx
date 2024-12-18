import { useState } from "react"
import styles from "./list.module.scss"
import { Link } from "react-router"
import { Slider } from "@nextui-org/react"

type props = {
    id: string,
    name: string,
    target: number,
    unit: string,
    days: string,
    completedToday: number
}

function MesList(props: props) {
    const [completed, setCompleted] = useState(props.completedToday | 0)
    const [applied, setApplied] = useState(props.completedToday | 0)


    async function handleClick() {
        if(completed === applied) return;
        setApplied(completed)

        try{
            let req = await fetch("/api/mes_done", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: props.id,
                    target: completed
                })
            });
    
            console.log(req)
          } catch (err) {
            console.log(err)
          }
    }

    if(props.target === applied){
        return (
// ik thats not yes/no element, but it just shares styles
<div className={styles.yoel} key={props.id}>
    <div className={styles.name}><Link to={`/overview/${props.id}`}>{props.name}</Link></div>
    <div className={styles.every}>
        <div className={props.days[0] === "1" ? styles.selected : ""}>M</div>
        <div className={props.days[1] === "1" ? styles.selected : ""}>T</div>
        <div className={props.days[2] === "1" ? styles.selected : ""}>W</div>
        <div className={props.days[3] === "1" ? styles.selected : ""}>T</div>
        <div className={props.days[4] === "1" ? styles.selected : ""}>F</div>
        <div className={props.days[5] === "1" ? styles.selected : ""}>S</div>
        <div className={props.days[6] === "1" ? styles.selected : ""}>S</div>
    </div>
    <div className={styles.completed}>Completed</div>
</div>
        )
    }
    
    return ( 
<div className={styles.mesel}>
    <div className={styles.top}>
        <div className={styles.name}><Link to={`/overview/${props.id}`}>{props.name}</Link></div>
        <div className={styles.every}>
            <div className={props.days[0] === "1" ? styles.selected : ""}>M</div>
            <div className={props.days[1] === "1" ? styles.selected : ""}>T</div>
            <div className={props.days[2] === "1" ? styles.selected : ""}>W</div>
            <div className={props.days[3] === "1" ? styles.selected : ""}>T</div>
            <div className={props.days[4] === "1" ? styles.selected : ""}>F</div>
            <div className={props.days[5] === "1" ? styles.selected : ""}>S</div>
            <div className={props.days[6] === "1" ? styles.selected : ""}>S</div>
        </div>
    </div>
    <div className={styles.bottom}>
        <div className={styles.rangeField}>
            <Slider
                color="secondary"
                className={styles.range}
                defaultValue={applied}
                minValue={applied}
                maxValue={props.target}
                step={1}
                onChange={setCompleted as (value: number | number[]) => void}
                aria-label="Target"
            />
        </div>
        <div className={styles.target}>{completed}/{props.target} {props.unit}</div>
        <button className={styles.mes_submit} style={completed === applied ? { visibility: "hidden" } : {}} onClick={handleClick}>OK</button>
    </div>

</div>
     );
}

export default MesList;