import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";


function MyApp() {
    const [characters, setCharacters] = useState([
    ]);

    function deleteUser(person) {
      const promise = fetch(`Http://localhost:8000/users/${person.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
  
      return promise;
    }

    function removeOneCharacter(index) {
      const updated = characters.filter((character, i) => {
        return i !== index;
      });

      deleteUser(characters[index])
      .then((res) => {
        if (res.status !== 201)
        throw new Error("Not Removed!");
      })
      .then( () => setCharacters(updated))
      .catch((error) => {
        console.log(error);
      })
    }

    function updateList(person) { 
      postUser(person)
      .then((res) => {
          if (res.status !== 201)
          throw new Error("Not Added!");
        })
        .then(() => setCharacters([...characters, person]))
        .catch((error) => {
          console.log(error);
        })
    }

    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
  
      return promise;
    }

    

    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }, [] );

    return (
        <div className="container">
          <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
          />
          <Form handleSubmit={updateList} />
        </div>
    );
}
export default MyApp;