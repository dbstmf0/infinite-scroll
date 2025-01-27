const CircleBar = ({percentage}) => {
    const style={
        backgroundImage:`conic-gradient(#ff0 0% ${percentage}%, #21cc29 ${percentage}% 100%)`
    };
    return (
        <div className="circlebar">
            <div className="progress" style={style}>
                <div className="inner">
                    <span>{Math.floor(percentage)}%</span>
                </div>
            </div>
        </div>
    );
};

export default CircleBar;