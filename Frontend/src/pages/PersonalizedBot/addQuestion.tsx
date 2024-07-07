import { Link } from "react-router-dom";
import "../../styles/addQuestion.css"
import {FormEvent, useState } from "react"

const AddQuestion = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [type, setType] = useState("")
    const [time, setTime] = useState("")

    const handleAddQuestion = (e: FormEvent) => {
        e.preventDefault()
        console.log(title)
        console.log(description)
        console.log(image)
        console.log(type)
        console.log(time)
    }

    return (
        <div className="Add-Questions-component">
        <div className="active-component-header">
            <div className="path">
                <Link to={"/"} className="path-link">Dashboard</Link>
                <p>&nbsp; &gt; &nbsp;</p>
                <Link to={"/personalized-bot"} className="path-link">Personalized Bot</Link>
                <p>&nbsp; &gt; &nbsp;</p>
                <Link to={"/personalized-bot/questions"} className="path-link">Questions</Link>
                <p>&nbsp; &gt; Add Question</p>
            </div>
            <h1>Add Question</h1>
            <form className="add-question-form" onSubmit={(e) => {handleAddQuestion(e)}}>
                <label htmlFor="Title">Title</label>
                <input type="text" name="title" id="question-title" onChange={(e) => {setTitle(e.target.value)}}/>
                <label htmlFor="Description">Description</label>
                <textarea id="question-description" onChange={(e) => {setDescription(e.target.value)}}/>
                <label htmlFor="image">Upload Image</label>
                <input type="file" name="image" id="question-image" onChange={(e) => {setImage(e.target.value)}}/>
                <select name="question-type" id="question-type" required onChange={(e) => {setType(e.target.value)}}>
                    <option value="none">None</option>
                    <option value="mcq">MCQ</option>
                    <option value="description">Description</option>
                </select>
                <label htmlFor="set-time">Set Time</label>
                <input type="time" name="time" id="question-time" onChange={(e) => {setTime(e.target.value)}}/>
                <input type="submit" value={"Save"} />
            </form>
        </div>
        </div>
    )
};

export default AddQuestion;