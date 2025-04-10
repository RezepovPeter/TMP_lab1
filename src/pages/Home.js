import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import axios from "axios";
import config from "../config";
import Header from "./Header";
import "./styles/Home.css";

const Home = () => {
  const [residents, setResidents] = useState([]);
  const [selectedResident, setSelectedResident] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchResidents();
  }, []);

  useEffect(() => {
    if (id) {
      const resident = residents.find(r => r.id === parseInt(id));
      setSelectedResident(resident);
    } else {
      setSelectedResident(null);
    }
  }, [id, residents]);
  const fetchResidents = () => {
    axios
      .get(`${config.API_URL}/residents`)
      .then((response) => setResidents(response.data))
      .catch((error) => console.error("Ошибка загрузки данных:", error));
  };

  const handleResidentClick = (resident) => {
    setSelectedResident(resident);
    navigate(`/detail/${resident.id}`);
  };
  return (
    <>
      <Header />
      <div className="container">
        <div className="sidebar">
          {residents.map((resident) => (
            <div
              key={resident.id}
              className={`profile-card ${
                selectedResident?.id === resident.id ? "selected" : ""
              }`}
              onClick={() => handleResidentClick(resident)}
            >
              <p>{resident.Name}</p>
              <p>{resident.Adress}</p>
            </div>
          ))}
        </div>

        <div className="content">
          <Outlet context={[residents, setResidents, fetchResidents]} />
          <button className="create-btn" onClick={() => navigate('/add')}>
            Создать
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
