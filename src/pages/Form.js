import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import config from "../config";
import "./styles/Form.css";

const Form = ({ mode, onClose, refresh }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const resident = location.state?.resident || null;

  const [formData, setFormData] = useState({
    Name: "", DateOfBirth: "", Adress: "", PhoneNumber: ""
  });

  const [errors, setErrors] = useState({
    DateOfBirth: "", PhoneNumber: ""
  });

  const [, , fetchResidents] = useOutletContext();

  useEffect(() => {
    if (resident) {
      setFormData(resident);
    }
  }, [resident]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Очистка ошибок при вводе
  };

  const isValidPhone = (phone) => {
    return /^\+7\d{10}$/.test(phone);
  };

  const isValidDate = (dateStr) => {
    const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    const match = dateStr.match(regex);
    if (!match) return false;
  
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);
  
    if (month < 1 || month > 12 || day < 1 || year < 1900) return false;
  
    const daysInMonth = new Date(year, month, 0).getDate();
    return day <= daysInMonth;
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!isValidPhone(formData.PhoneNumber)) {
      newErrors.PhoneNumber = "Неверный формат. Пример: +7XXXXXXXXXX";
    }

    if (!isValidDate(formData.DateOfBirth)) {
      newErrors.DateOfBirth = "Неверный формат даты. Пример: 01.01.2000";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const request =
      mode === "edit"
        ? axios.put(`${config.API_URL}/residents/${resident.id}`, formData)
        : axios.post(`${config.API_URL}/residents`, formData);

    request
      .then(() => {
        fetchResidents();
        navigate("/");
        onClose();
      })
      .catch((error) => console.error("Ошибка при сохранении:", error));
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="form-container">
      <h3>{mode === "edit" ? "Редактировать жильца" : "Создать жильца"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          placeholder="Имя"
          required
        />

        <input
          type="text"
          name="DateOfBirth"
          value={formData.DateOfBirth}
          onChange={handleChange}
          placeholder="Дата рождения (ДД.ММ.ГГГГ)"
          required
        />
        {errors.DateOfBirth && <p className="error">{errors.DateOfBirth}</p>}

        <input
          type="text"
          name="Adress"
          value={formData.Adress}
          onChange={handleChange}
          placeholder="Адрес"
          required
        />

        <input
          type="text"
          name="PhoneNumber"
          value={formData.PhoneNumber}
          onChange={handleChange}
          placeholder="Телефон (+7XXXXXXXXXX)"
          required
        />
        {errors.PhoneNumber && <p className="error">{errors.PhoneNumber}</p>}

        <div className="form-buttons">
          <button type="submit">Сохранить</button>
          <button type="button" onClick={handleCancel}>Отмена</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
