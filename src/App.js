import React, {useState, useEffect} from 'react';
import './App.css';
import Datatable from './components/DataTable';
import Modalwindow from './components/ModalWindow';
import Newrec from './components/NewRec';
import Request from './Request';


function App() {
  const [st, setSt] = useState([]);
  const [modal, setModal] = useState(false);
  useEffect(() => {
      setData()
  },[]);

  const setData = () => { 
        Request.get("/")
        .then(res => setSt(res.data))
        .catch(err => console.log(err))
  }
    return (
    <div className="App">
      <h2>Таблица с данными</h2>
      <table>
        <tbody>
          <tr>
            <th>
                Возраст
            </th>
            <th>
                Еmail
            </th>
            <th>
                Имя
            </th>
            <th>
                Телефонный номер
            </th>
          </tr>
            {st.map(cells => 
              cells.data && <Datatable setData={setData} cell={cells} key={cells._id} />)}
        </tbody>
        </table>
        <button onClick={() => setModal(true)}>
          Создать новою запись
        </button>
        <Modalwindow visible={modal} setVisible={setModal}> 
          <Newrec modalVisible={setModal} setData={setData}/>
        </Modalwindow>
      </div>
    );
}

export default App;
