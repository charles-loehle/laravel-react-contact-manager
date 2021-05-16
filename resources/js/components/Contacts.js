import { Link } from "react-router-dom";

const Contacts = ({ contacts, handleDelete, handleEdit }) => {
    ///console.log(contacts);
    return (
        <div className="Contacts">
            <h1>Contacts</h1>
            {contacts.map((contact) => {
                return (
                    <div key={contact.id}>
                        <h2>{contact.name}</h2>
                        <p>{contact.email}</p>
                        <p>{contact.phone}</p>
                        <div>
                            <Link to={`/${contact.id}/edit`}>Edit</Link>
                            <button onClick={() => handleDelete(contact.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Contacts;
