import { useRef, useState } from "react";
import styles from "./create.module.scss"
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";

function Create() {

const yoName = useRef<HTMLInputElement>(null)
const yoNotes = useRef<HTMLInputElement>(null)


const meN = useRef<HTMLInputElement>(null)
const meU = useRef<HTMLInputElement>(null)
const meT = useRef<HTMLInputElement>(null)
const meNotes = useRef<HTMLInputElement>(null)

const [message, setMessage] = useState(["",""])
const [date, setDate] = useState([0, 0, 0, 0, 0, 0, 0])



function selectDate(target: HTMLDivElement, slot: number){
    const newDate = [...date]
    newDate[slot] = date[slot] === 0 ? 1 : 0;
    target.classList.toggle(styles.selected, newDate[slot] === 1)
    setDate(newDate)
}

async function handleClick1(){
    if(!yoName.current?.value || date.join("") == "0000000") {
        setMessage(["some fields are empty", ""])
        return
    }

    try{
        let req = await fetch("/create/yo_habit", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: yoName.current?.value,
                every: date.join(""),
                notes: yoNotes.current?.value,
            })
        });

        console.log(req)
        if(req.ok){
            setTimeout(() => {
                window.location.replace("/");
            }, 500)
            return;
        }
        const info = await req.text()
        setMessage([info, ""] )
      } catch (err) {
        console.log(err)
      }

    // setMessage(["",""])

}
async function handleClick2(){
    if(!(meN.current?.value && meU.current?.value && meT.current?.value && date.join("") != "0000000")){
        setMessage(["", "some fields are empty"])
        return
    }

    try {
        let req = await fetch("/create/mes_habit", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: meN.current?.value,
                target: meT.current?.value,
                unit: meU.current?.value,
                every: date.join(""),
                notes: meNotes.current?.value
            })
        })

        console.log(req)
        // if(req.ok){window.location.replace("/"); return}
        if(req.ok){
            setTimeout(() => {
                window.location.replace("/");
            }, 500)
            return;
        }
        const info = await req.text()
        console.log(info)
        setMessage(["", info])
    } catch (err) {
        console.log(err)
    }
}

    return (
        <Tabs aria-label="Options" color="secondary">
            <Tab key="yo" title="Yes / No" className={styles.tab}>
                <Card>
                    <CardBody>
<div className={`main ${styles.create}`}>
    <div className={styles.line}>Name: <input type="text" placeholder="e.g. Exercise" ref={yoName}/></div>
    <div className={styles.line}>Every
        <div className={styles.choice}>
            <div className={date[0] === 1 ? styles.selected : ""} onClick={ev => selectDate(ev.target as HTMLDivElement, 0)}>M</div>
            <div className={date[1] === 1 ? styles.selected : ""} onClick={ev => selectDate(ev.target as HTMLDivElement, 1)}>T</div>
            <div className={date[2] === 1 ? styles.selected : ""} onClick={ev => selectDate(ev.target as HTMLDivElement, 2)}>W</div>
            <div className={date[3] === 1 ? styles.selected : ""} onClick={ev => selectDate(ev.target as HTMLDivElement, 3)}>T</div>
            <div className={date[4] === 1 ? styles.selected : ""} onClick={ev => selectDate(ev.target as HTMLDivElement, 4)}>F</div>
            <div className={date[5] === 1 ? styles.selected : ""} onClick={ev => selectDate(ev.target as HTMLDivElement, 5)}>S</div>
            <div className={date[6] === 1 ? styles.selected : ""} onClick={ev => selectDate(ev.target as HTMLDivElement, 6)}>S</div>
        </div>
    </div>
    <div className={styles.line}>Notes: <input type="text" placeholder="Additional notes (optional)" ref={yoNotes}/></div>
    <div className={styles.warning}>{message[0]}</div>
    <div className={styles.buttons}>
        <div className={styles.button} onClick={handleClick1}>Save</div>
    </div>
</div>
                    </CardBody>
                </Card>
            </Tab>
            <Tab key="videos" title="Measurable" className={styles.tab}>
                <Card>
                    <CardBody>
<div className={`main ${styles.create}`}>
    <div className={styles.line}>Name: <input type="text" placeholder="e.g. Run" ref={meN}/></div>
    <div className={styles.line}>Target: <input type="text" placeholder="e.g. 15" ref={meT}/></div>
    <div className={styles.line}>Unit: <input type="text" placeholder="e.g. km" ref={meU}/></div>
    {/* <div className={styles.line}>Every <input type="number" min={1} pattern="[0-9]" className={styles.small} placeholder="2" ref={meE}/> days</div> */}
    <div className={styles.line}>Every
        <div className={styles.choice}>
            <div className={date[0] === 1 ? styles.selected : ""} onClick={ev => selectDate(ev.target as HTMLDivElement, 0)}>M</div>
            <div className={date[1] === 1 ? styles.selected : ""} onClick={ev => selectDate(ev.target as HTMLDivElement, 1)}>T</div>
            <div className={date[2] === 1 ? styles.selected : ""} onClick={ev => selectDate(ev.target as HTMLDivElement, 2)}>W</div>
            <div className={date[3] === 1 ? styles.selected : ""} onClick={ev => selectDate(ev.target as HTMLDivElement, 3)}>T</div>
            <div className={date[4] === 1 ? styles.selected : ""} onClick={ev => selectDate(ev.target as HTMLDivElement, 4)}>F</div>
            <div className={date[5] === 1 ? styles.selected : ""} onClick={ev => selectDate(ev.target as HTMLDivElement, 5)}>S</div>
            <div className={date[6] === 1 ? styles.selected : ""} onClick={ev => selectDate(ev.target as HTMLDivElement, 6)}>S</div>
        </div>
    </div>
    <div className={styles.line}>Notes: <input type="text" placeholder="Additional notes (optional)" ref={meNotes}/></div>
    <div className={styles.warning}>{message[1]}</div>

    <div className={styles.buttons}>
        <div className={styles.button} onClick={handleClick2}>Save</div>
    </div>
</div>
                    </CardBody>
                </Card>
            </Tab>

        </Tabs>
     );
}

export default Create;