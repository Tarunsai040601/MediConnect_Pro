import { Link } from 'react-router-dom';
import departments from '../../assets/data/departments.json';
import DepartmentCard from '../../components/DepartmentCard/DepartmentCard';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import BackgroundAnimation from '../../components/BackgroundAnimation/BackgroundAnimation';
import './Departments.css';

const Departments = () => {
  return (
    <div className="departmentsPage">
      <section className="pageHero deptHero">
        <BackgroundAnimation />
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Departments</span>
          </nav>
          <h1>Our Departments</h1>
          <p>
            Explore our specialized medical departments staffed by expert physicians
            and equipped with advanced technology for comprehensive care.
          </p>
        </div>
      </section>

      <section className="section deptGridSection">
        <div className="container">
          <ScrollReveal>
            <div className="deptStats">
              <div className="deptStat">
                <strong>{departments.length}</strong>
                <span>Departments</span>
              </div>
              <div className="deptStat">
                <strong>{departments.reduce((sum, d) => sum + d.doctors, 0)}+</strong>
                <span>Specialists</span>
              </div>
              <div className="deptStat">
                <strong>{departments.reduce((sum, d) => sum + d.patients, 0).toLocaleString()}+</strong>
                <span>Patients Served</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="deptGrid">
            {departments.map((dept, i) => (
              <ScrollReveal key={dept.id} delay={i * 60}>
                <DepartmentCard department={dept} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Departments;
