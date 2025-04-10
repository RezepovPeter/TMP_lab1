import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

const ResidentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [residents, setResidents, fetchResidents] = useOutletContext();

  console.log("Residents:", residents);
  console.log("ID из URL:", id);

  if (!residents || residents.length === 0) return <p>Загрузка данных...</p>;

  const resident = residents.find(r => r.id === id);

  if (!resident) return <p>Житель не найден</p>;

  const handleDelete = () => {
    axios.delete(`${config.API_URL}/residents/${id}`)
      .then(() => {
        fetchResidents();
        setResidents(residents.filter(r => r.id !== Number(id)));
        navigate('/');
      })
      .catch((error) => console.error("Ошибка удаления:", error));
  };

  return (
    <div className="resident-details">
      <h2>{resident.Name}</h2>
      <p><strong>Дата рождения:</strong> {resident.DateOfBirth}</p>
      <p><strong>Адрес:</strong> {resident.Adress}</p>
      <p><strong>Телефон:</strong> {resident.PhoneNumber}</p>
      <div className="button-group">
        <button onClick={() => navigate(`/edit/${id}`, {state: { resident }})}>Изменить</button>
        <button onClick={handleDelete}>Удалить</button>
      </div>
    </div>
  );
};

export default ResidentDetail;
