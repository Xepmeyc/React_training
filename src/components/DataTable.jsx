import React, { useState } from 'react';
import Request from '../Request';


const Datatable = (props) => {

    const [inpState, setInpState] = useState({ isRead: true, clName: 'unRead' });
    const [inpData, setInpData] = useState({
        age: props.cell.data.age,
        email: props.cell.data.email,
        name: props.cell.data.name,
        phone: props.cell.data.phone,
    })


    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setInpData({ ...inpData, [name]: value, })

    }

    const delRec = () => {
        Request.delete(`/${props.cell._id}`)
            .then(() => props.setData())
            .catch((err) => console.log(err))
    }


    const saveEdit = () => {

        if (inpState.isRead) {
            return setInpState({ isRead: false, clName: "Readible" })
        }

        if (JSON.stringify(inpData) === JSON.stringify(props.cell.data)) {
            return (alert("Ввидите изменения!"));
        }

        Request.post(`/${props.cell._id}`, { data: inpData })
            .then(res => {
                props.setData()
                if (res.data !== '') {
                    setInpState({ isRead: true, clName: "unRead" })
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <tr className='DataTable' id={props.cell._id}>
            <td>
                <input
                    className={inpState.clName}
                    name="age"
                    readOnly={inpState.isRead}
                    type="text"
                    value={inpData.age}
                    onChange={handleInputChange}
                />
            </td>
            <td>
                <input
                    className={inpState.clName}
                    name="email"
                    readOnly={inpState.isRead}
                    type="text"
                    value={inpData.email}
                    onChange={handleInputChange}
                />
            </td>
            <td>
                <input
                    className={inpState.clName}
                    name="name"
                    readOnly={inpState.isRead}
                    type="text"
                    value={inpData.name}
                    onChange={handleInputChange}
                />
            </td>
            <td>
                <input
                    className={inpState.clName}
                    name="phone"
                    readOnly={inpState.isRead}
                    type="text"
                    value={inpData.phone}
                    onChange={handleInputChange}
                />
            </td>
            <td>
                <button hidden={!inpState.isRead} onClick={saveEdit} className="editBtn">Изменить</button>
                <button hidden={inpState.isRead} onClick={saveEdit} className="saveBtn">Сохранить</button>
            </td>
            <td>
                <button onClick={delRec}>Удалить</button>
            </td>
        </tr>
    );
}

export default Datatable;
