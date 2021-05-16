import { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

const ContactEdit = () => {
    let history = useHistory();
    let { id } = useParams();
    const [contact, setContact] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const getContact = (props) => {
        axios
            .get(`/api/contact/${id}`)
            .then((res) => {
                console.log(res.data);
                setContact(...contact, res.data);
                setName(res.data.name);
                setEmail(res.data.email);
                setPhone(res.data.phone);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getContact();
    }, []);

    const handleSubmit = (e) => {
        //let { id } = useParams();
        e.preventDefault();
        console.log("Contact edited... " + id);
        axios
            .patch(`/api/contact/${id}`, {
                name,
                email,
                phone,
            })
            .then((res) => {
                history.push("/dashboard");
            });
    };

    return (
        <div className="ContactEdit">
            <div className="App">
                <div className="form-container">
                    <h1>Edit Contact</h1>
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
                        <button className="btn btn-primary">Submit</button>
                    </form>
                    <Link to={"/dashboard"}>Go Back</Link>
                </div>
                <hr />
            </div>
        </div>
    );
};

export default ContactEdit;
