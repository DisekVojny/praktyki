import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./overview.module.scss"

type Yo = {
    id: string,
    name: string,
    days: string,
    notes: string,
    completedToday: boolean,
}

type Mes = {
    id: string,
    name: string,
    target: number,
    unit: string,
    days: string,
    notes: string,
    completedToday: number
}

type YoProps = ["yo", Yo, start: {start: string}[]]
type MesProps = ["mes", Mes, {start: string, target: number}[]]

function formatDate(date: Date){
    return [
        String(date.getDate()).padStart(2, '0'), 
        String(date.getMonth() + 1).padStart(2, '0'), 
        String(date.getFullYear()).slice(-2)
    ].join('/');
}

function Overview() {
    const params = useParams();
    console.log(params.id);
    const [data, setData] = useState<YoProps | MesProps | null>(null);

    useEffect(() => {
        fetch(`/details/${params.id}`)
            .then(res => res.json())
            .then(text => {
                setData(text);
            });
    }, [params.id]);

    if (!data) {
        return <h1>Loading...</h1>;
    } else if (data[0] === "yo") {
        return <Yo {...data} />;
    } else if (data[0] === "mes") {
        return <Mes {...data} />;
    }
    return <h1>Could not get information about this habit</h1>;
}

function Yo({ 1: yoData, 2: startDates }: YoProps) {
    const dates: Date[] = startDates.map(el => new Date(el.start));
    dates.sort((a, b) => a.getTime() - b.getTime());

    let formatted = ""
    if(dates.length) formatted = formatDate(dates[0])
    
    async function handleDelete(){
        let req = await fetch("/delete/yo", {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: yoData.id})
        })

        if(req.ok){
            setTimeout(() => {
                window.location.replace("/");
            }, 100)
            return;
        }
    }

    return (
        <div className={styles.yo}>
            <div className={styles.mainInfo}>
                <div className={styles.name}>Name: {yoData.name}</div>
                <div className={styles.type}>Type: Yes/No</div>
                <div className={styles.notes}>Notes: {yoData.notes}</div>
                <div className={styles.every}>
                    <div className={yoData.days[0] === "1" ? styles.selected : ""}>M</div>
                    <div className={yoData.days[1] === "1" ? styles.selected : ""}>T</div>
                    <div className={yoData.days[2] === "1" ? styles.selected : ""}>W</div>
                    <div className={yoData.days[3] === "1" ? styles.selected : ""}>T</div>
                    <div className={yoData.days[4] === "1" ? styles.selected : ""}>F</div>
                    <div className={yoData.days[5] === "1" ? styles.selected : ""}>S</div>
                    <div className={yoData.days[6] === "1" ? styles.selected : ""}>S</div>
                </div>
                <div className={styles.started}>First time completed this habit on: {formatted}</div>
                {dates.length !== 0 && <>
                    <div className={styles.times}>At this moment, you completed this habit {dates.length} times!</div>
                </>}
                <h1 className={styles.delete} onClick={handleDelete}>Delete this habit?</h1>
            </div>
        </div>
    );
}

function Mes({ 1: mesData, 2: startDates }: MesProps) {
    const dates: Date[] = startDates.map(el => new Date(el.start));
    const progress: number[] = startDates.map(el => el.target / mesData.target)
    let average = 0
    if(progress.length) average = progress.reduce(((a,b) => a+b), 0) / progress.length
    
    dates.sort((a, b) => a.getTime() - b.getTime());

    let formatted = "It hasn't been done yet"
    if(dates.length) formatted = formatDate(dates[0])


    async function handleDelete(){
        let req = await fetch("/delete/mes", {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: mesData.id})
        })

        if(req.ok){
            setTimeout(() => {
                window.location.replace("/");
            }, 100)
            return;
        }
    }

    return (
        // <div className={styles.mes}>
        //     <div>Name: {mesData.name}</div>
        //     <div>Target: {mesData.target} {mesData.unit}</div>
        //     <div>Completed today: {mesData.completedToday}</div>
        // </div>

        <div className={styles.mes}>
            <div className={styles.mainInfo}>
                <div className={styles.name}>Name: {mesData.name}</div>
                <div className={styles.type}>Type: Measurable</div>
                <div className={styles.target}>Daily target: {mesData.target} {mesData.unit}</div>
                <div className={styles.notes}>Notes: {mesData.notes}</div>
                <div className={styles.every}>
                    <div className={mesData.days[0] === "1" ? styles.selected : ""}>M</div>
                    <div className={mesData.days[1] === "1" ? styles.selected : ""}>T</div>
                    <div className={mesData.days[2] === "1" ? styles.selected : ""}>W</div>
                    <div className={mesData.days[3] === "1" ? styles.selected : ""}>T</div>
                    <div className={mesData.days[4] === "1" ? styles.selected : ""}>F</div>
                    <div className={mesData.days[5] === "1" ? styles.selected : ""}>S</div>
                    <div className={mesData.days[6] === "1" ? styles.selected : ""}>S</div>
                </div>
                <div className={styles.started}>First time completed this habit on: {formatted}</div>
                {dates.length !== 0 && <>
                    <div className={styles.times}>At this moment, you completed this habit {dates.length} times!</div>
                    <div className={styles.times}>Avearge accomplishment: {average*100}%</div>
                </>}
                <h1 className={styles.delete} onClick={handleDelete}>Delete this habit?</h1>
            </div>
        </div>
    );
}

export default Overview;
