import { Link } from 'react-router-dom';
import { FaStar, FaCalendarPlus } from 'react-icons/fa';
import Card from '../Card/Card';
import Button from '../Button/Button';
import './DoctorCard.css';

const DoctorCard = ({ doctor }) => {
  return (
    <Card className="doctorCard">
      <div className="imageWrap">
        <img src={doctor.image} alt={doctor.name} loading="lazy" />
        <span className="dept">{doctor.department}</span>
      </div>
      <div className="info">
        <h3>{doctor.name}</h3>
        <p className="specialty">{doctor.specialty}</p>
        <div className="meta">
          <span className="rating"><FaStar /> {doctor.rating}</span>
          <span>{doctor.experience} yrs exp.</span>
        </div>
        <div className="actions">
          <Link to={`/doctors/${doctor.id}`}>
            <Button variant="outline" size="sm" full>View Profile</Button>
          </Link>
          <Link to={`/book-appointment?doctor=${doctor.id}`}>
            <Button size="sm" full><FaCalendarPlus /> Book</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default DoctorCard;
