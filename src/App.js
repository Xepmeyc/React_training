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
      Request.get("/")
        .then(res => { 
          const cellContent = res.data;
          setSt(cellContent)
        })
        .catch((err) => { 
          console.log(err);
        })
  });

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
          {st.map(function (cells) {
            if (cells.data !== undefined) {
              return (<Datatable cell={cells} key={cells._id} />)
            }else return null
          }
          )}
        </tbody>
        </table>
        <button onClick={() => {setModal(true) }}>
          Создать новою запись
        </button>
        <Modalwindow visible={modal} setVisible={setModal}> 
          <Newrec modalVisible={ setModal}/>
        </Modalwindow>
      </div>
    );
}

export default App;
