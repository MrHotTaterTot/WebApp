function MetricComponent({ metric, value }) {
    return (
        <div
            className="MetricComponent"
        >
            <p>
                {metric}:
            </p>
            <p>
                {value}
            </p>
        </div>
    )
}

export default MetricComponent