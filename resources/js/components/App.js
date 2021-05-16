import axios from "axios";
import { useState, useEffect } from "react";
import Contacts from "./Contacts";
import "./App.css";

const App = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [contacts, setContacts] = useState([]);
    const [edit, setEdit] = useState(false);

    const getContacts = () => {
        axios
            .get("/api/contacts")
            .then((res) => {
                //console.log(res.data);
                setContacts(...contacts, res.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getContacts();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("handleSubmit...");
        axios
            .post("api/contact/store", {
                name,
                email,
                phone,
            })
            .then((res) => {
                setContacts([...contacts, res.data]);
                setName("");
                setEmail("");
                setPhone("");
            })
            .catch((err) => console.log(err));
    };

    const handleEdit = (id) => {
        console.log("edited: " + id);
        setEdit(true);
    };

    const handleDelete = (id) => {
        // console.log("deleted: " + id);
        axios
            .delete(`api/contact/${id}`)
            .then(setContacts(contacts.filter((contact) => contact.id !== id)));
    };

    return (
        <div className="App">
            <div className="form-container">
                <h1>Contact Manager</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            name="name"
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            name="email"
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <button className="btn btn-primary">New Contact</button>
                </form>
            </div>
            <hr />
            <Contacts
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                contacts={contacts}
            />
        </div>
    );
};

export default App;
