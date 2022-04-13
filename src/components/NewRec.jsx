import React, { useState } from 'react';
import Request from '../Request';


const Newrec = ({ add }) => {

    const [inpData, setInpData] = useState({
        age: '',
        email: '',
        name: '',
        phone: '',
    })

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setInpData({ ...inpData, [name]: value, })

    }

    const newData = () => {

        if (!inpData.age && !inpData.email && !inpData.name && !inpData.phone) {
            alert("Enter new data!")
        } else {

            const str = {
                data: inpData
            }

            Request.put('/', str).catch((err) => {
                console.log(err);
            })
            setInpData(
                {
                    age: '',
                    email: '',
                    name: '',
                    phone: '',
                }
            )
        }

    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>
                            age
                        </th>
                        <th>
                            email
                        </th>
                        <th>
                            name
                        </th>
                        <th>
                            phone
                        </th>
                    </tr>
                    <tr>
                        <td>
                            <input
                                value={inpData.age}
                                name="age"
                                type="text"
                                onChange={handleInputChange}
                            />
                        </td>
                        <td>
                            <input
                                value={inpData.email}
                                name="email"
                                type="text"
                                onChange={handleInputChange}
                            />
                        </td>
                        <td>
                            <input
                                value={inpData.name}
                                name="name"
                                type="text"
                                onChange={handleInputChange}
                            />
                        </td>
                        <td>
                            <input
                                value={inpData.phone}
                                name="phone"
                                type="text"
                                onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={newData}>Add new record</button>
        </div>
    );
}

export default Newrec;
