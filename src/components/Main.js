import { useEffect, useState } from "react"
import { Route, Switch } from "react-router-dom"
import Index from "../pages/Index"
import Show from "../pages/Show"

function Main(props){

const [people, setPeople] = useState(null)

const URL = "https://people-lab.herokuapp.com/people/"

const getPeople = async ()=>{
    const response = await fetch(URL)
    const data =await response.json()
    setPeople(data)
}

const createPeople = async (person) =>{
    //makes a post request to create people 
    await fetch(URL, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
    })
    //update list of people
    getPeople()
}

const updatePeople = async (person, id) =>{
    //make a put request to create people 
    await fetch(URL + id, {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(person)
    })
    //update list of people
    getPeople()
}

const deletePeople = async (id) =>{
    await fetch(URL + id, {
        method: "delete"
    })
    getPeople()
}

useEffect(()=> getPeople(), [])

    return (
    <main>
        <Switch>
            <Route exact path="/">
                <Index people={people} createPeople={createPeople}/>
            </Route>
            <Route exact path="/people/:id" 
            render={(rp) => (
                <Show 
                {...rp}
                people={people}
                updatePeople={updatePeople}
                deletePeople={deletePeople}
                />
            )}
            />
                
            
        </Switch>
    </main>
        )
  } 
  
  export default Main