function MetricComponent({ metric, value, unit }) {
    return (
        <div>
            <h2>{metric}</h2>
            <p>
                {value} {unit} {/* Display the unit here */}
            </p>
        </div>
    );
}

export default MetricComponent