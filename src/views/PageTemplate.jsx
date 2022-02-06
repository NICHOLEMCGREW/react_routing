import { useState } from "react";

const PageTemplate = ({ title }) => {
    const [theme, setTheme] = useState("primary");

    return (
        <div className={`theme-${theme} h-100`}>
            <h1>{title}</h1>
            <select 
            name="theme" 
            id="theme" 
            value={theme}
            onChange={(event) => setTheme(event.target.value)}
            >
                <option value="primary">Primary</option>
                <option value="secondary">secondary</option>
                <option value="retro">retro</option>
                <option value="purple">purple</option>
                <option value="dark">dark</option>
            </select>
        </div>
    );
};
export default PageTemplate;
