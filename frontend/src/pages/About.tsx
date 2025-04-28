import "../styles/AboutPageStyle.css"

function About(){
    return (
        <div className="about-notebook-page">
            <div className="about-section">
                <div className="about-image">
                    <img src="screenshot_lists.PNG" alt="Screenshot of the page of lists" />
                </div>
                <div className="about-text">
                    <h2>About Us</h2>
                    <p>
                        Welcome to The List Of Tasks! Your solution to the tedious problem of schedule management! <br/>
                        Organizing your life, creating guides, managing chores, all of these will become a thing of the past thanks to us!<br/>
                        TLOU is a simple and elegant system for managing your lists, tasks, and well... lists of tasks... <br/>
                    </p>
                </div>
            </div>

            <div className="about-section reverse">
                <div className="about-image">
                    <img src="screenshot_tasks.PNG" alt="Screenshot of the page containing tasks" />
                </div>
                <div className="about-text">
                    <h2>Features</h2>
                    <p>
                        <strong>List: </strong> create, edit, describe and delete lists. These lists will contain your tasks <br/>
                        <strong>Tasks:</strong> create, edit, delete, prioritize and mark tasks as done. Tasks are where you place goals. <br/>
                        Lists are sorted by recent activity, while Tasks are sorted first by priority, then by date of creation.
                    </p>
                    <p>Enjoy your stay!</p>
                </div>
            </div>
        </div>
    )
}

export default About