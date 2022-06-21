import React from "react";

function Footer(){
    const date = new Date()
    const year = date.getFullYear()

    return (
        <div className="footer">
            <p>&copy; {year} All Rights Reserved | <a href="https://github.com/kencodest/password-generator" target="_blank" rel="noferrer noopener">kencodest</a></p>
        </div>
    )
}

export default Footer