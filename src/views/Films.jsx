import { useState, useEffect } from "react";

const Films = () => {
    const [list, setList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [itemIndex, setItemIndex] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [count, setCount] = useState(1);
    
    const fetchList = async () => {
        let response = await fetch("https://ghibliapi.herokuapp.com/films");
        let data = await response.json();
        setList(data);
        setFilteredList(data);
        setItemIndex(0);
    };

    const handleTitleGuess = (event) => {
        event.preventDefault();

        let guess = document.querySelector("#guess");

        if (guess.value == filteredList[itemIndex].title) {
            setFeedback(list[itemIndex].title);
        } else {
           setFeedback(`${guess.value}, ${list[itemIndex].title}`); 
        }
    };

    const handleNextFilm = () => {
        let newList = filteredList.filter((item, index) => index != itemIndex);
        setFeedback("");
        setCount(count +1);
        setFilteredList(newList);        
        let nextIndex = Math.floor(Math.random() * newList.length);
        setItemIndex(nextIndex);
};
    
    useEffect(() => {
        fetchList();
    }, []);

    if (itemIndex == null) {
        return <h1>Loading...</h1>;
    } else if (filteredList.length == 0) {
        return (
            <div className="task-classcontainer">
        <div className="card">
            <div className="card-body">
                <h2>Thanks for playing!</h2>           
              </div>
            </div>
        </div>
        );
    } else {
    return (
        <div className="task-container">
            <h1>Studio Ghibli Films {count}</h1>            
                <div className="card" key={filteredList[itemIndex].id}>
                <div className="card-body">
                    <p>{filteredList[itemIndex].description}</p>
                    <p>What is the title of this movie?</p>
                    <form onSubmit={handleTitleGuess}>
                    <input 
                    type="text" 
                    name="guess" 
                    id="guess" 
                    placeholder="Castle in the sky"
                    />
                    <button type="submit">Submit</button>
                    </form>
                    <hr />
                    {feedback ? ( 
                      <div>
                        <span>{feedback}</span>
                        <button onClick={handleNextFilm}>Next</button>
                    </div>               
                    ) : null}
             </div>
         </div>   
     </div>                        
    );
    }
};

export default Films;