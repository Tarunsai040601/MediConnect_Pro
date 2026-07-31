import './Skeleton.css';

export const SkeletonLine = ({ width = 'w100', className = '' }) => (
  <div className={`skeleton text ${width} ${className}`} />
);

export const SkeletonCard = () => (
  <div className="card">
    <div className="cardSkeleton">
      <div className="skeleton image" />
      <div className="skeleton title" />
      <div className="skeleton text w100" />
      <div className="skeleton text w70" />
    </div>
  </div>
);

export const SkeletonAvatar = () => (
  <div className="row">
    <div className="skeleton avatar" />
    <div className="rowContent">
      <div className="skeleton text w50" />
      <div className="skeleton text w30" />
    </div>
  </div>
);

export default SkeletonLine;
