import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const LibCircle = ({percentage}) => {
    return (
        <div className="lib-circle">
        <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
            pathColor: `rgba(62, 152, 199)`,
            textColor: '#fff',
            textSize: '25px',
            trailColor: '#d6d6d6'
                })}
            />
        </div>
    );
};

export default LibCircle;