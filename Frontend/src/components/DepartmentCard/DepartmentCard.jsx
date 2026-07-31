import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import Card from '../Card/Card';
import './DepartmentCard.css';

const DepartmentCard = ({ department }) => {
  const Icon = FaIcons[department.icon] || FaIcons.FaHospital;

  return (
    <Link to={`/doctors?department=${encodeURIComponent(department.name)}`}>
      <Card className="deptCard">
        <div className="iconWrap" style={{ '--dept-color': department.color }}>
          <Icon />
        </div>
        <h3>{department.name}</h3>
        <p>{department.description}</p>
        <div className="stats">
          <span>{department.doctors} Doctors</span>
          <span>{department.patients.toLocaleString()}+ Patients</span>
        </div>
      </Card>
    </Link>
  );
};

export default DepartmentCard;
