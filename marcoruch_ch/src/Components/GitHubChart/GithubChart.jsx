import React from 'react'
function GithubChart() {
    const handleClick = () => {
        window.location = 'https://github.com/marcoruch';
    }
    return (<img style={{cursor:'pointer'}} href="https://github.com/marcoruch" src="https://ghchart.rshah.org/marcoruch" alt="https://github.com/marcoruch" onClick={() => handleClick()}></img>)
}

export default GithubChart;