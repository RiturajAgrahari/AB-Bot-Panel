import { Link } from "react-router-dom";
import "../../styles/addQuestion.css"
import {FormEvent, useRef, useState } from "react"
import api from "../../api";
import { AxiosError } from "axios";

const AddQuestion = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState< File >()
    const [questiontype, setQuestionType] = useState<string>()
    const [time, setTime] = useState("")
    const [questionOptions, setQuestionOptions] = useState<string[]>([])
    const [questionOption, setQuestionOption] = useState("")
    

    const addQuestionForm = useRef<HTMLFormElement>(null)
    const addOption = useRef<HTMLInputElement>(null)
    const optionDiv = useRef<HTMLDivElement>(null)
    const alertMessage = useRef<HTMLDivElement>(null)


    const handleImageFormat = (e: EventTarget & HTMLInputElement) => {
        if (e.files) {
            setImage(e.files[0])
        }
    }

    const handleAddQuestion = (e: FormEvent) => {
        e.preventDefault()
        addQuestionForm.current?.reset();
        setQuestionOptions([]);
        const addQuestionView = async () => {
            try {
                const res = await api.post("/api-data/personalized-bot/add-question/", {title, description, image, questiontype, time}, 
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                )
                if (res.status == 200) {
                    console.log(res)
                } 

            } catch (error) {
                if (error instanceof AxiosError){
                    if (error.response?.status == 401) {
                        handleShowAlertMessage();
                    } else {
                        alert(error);
                    }
                } else {
                    alert(error);
                }
            } 
        }
        addQuestionView();
    }

    const handleAddOption = () => {
        setQuestionOptions([...questionOptions, questionOption])
        setQuestionOption("")
        setQuestionType(questionOptions.toString())
        if (addOption.current) {
            addOption.current.value = ""
        }
    }

    const handleRemoveOption = (item: string) => {
        setQuestionOptions(l => l.filter(e => e !== item))
    }

    const handleSelectMenu = (e: React.ChangeEvent<{ value: string }>) => {
       if (e.target.value == "descriptive") {
        optionDiv.current?.classList.add("hide-option-div")
        setQuestionType("descriptive")
       } else if (e.target.value == "mcq") {
        optionDiv.current?.classList.remove("hide-option-div")
        setQuestionType(questionOptions.toString())
       }
    }

    const handleCloseAlertMessage = () => {
        if (alertMessage.current) {
            alertMessage.current.style.display = "none"    
        }
    }

    const handleShowAlertMessage = () => {
        if (alertMessage.current) {
            alertMessage.current.style.display = "block"
        }
    }

    return (
        <div className="Add-Questions-component Bot">
            <div ref={alertMessage} className="alert alert-danger alert-white rounded">
                <button onClick={handleCloseAlertMessage} type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                </div>
                <strong>Permission Denied!</strong> Guests can't post questions, Only Admins can do it!
            </div> 
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
            <form ref={addQuestionForm} className="add-question-form" onSubmit={(e) => {handleAddQuestion(e)}}>
                <label htmlFor="Title">Title</label>
                <input placeholder="Title" type="text" name="title" id="question-title" onChange={(e) => {setTitle(e.target.value)}} required/>
                <label htmlFor="Description">Description</label>
                <textarea placeholder="Description" id="question-description" onChange={(e) => {setDescription(e.target.value)}}/>
                <label htmlFor="image">Upload Image</label>
                <input type="file" name="image" id="question-image" onChange={(e) => {handleImageFormat(e.target)}} required/>
                <label htmlFor="type">Question Type</label>
                <select name="question-type" id="question-type" required onChange={(e) => {handleSelectMenu(e)}}>
                    <option value="none">None</option>
                    <option value="mcq">MCQ</option>
                    <option value="descriptive">Descriptive</option>
                </select>
                <div ref={optionDiv}>
                {
                    questionOptions.length > 0 ? <div>Options</div> : <div></div>
                }
                { questionOptions.map((item:string ) => {
                    return (
                        <>
                            <div className="question-options">
                                {item}
                            <svg onClick={() => {handleRemoveOption(item)}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                            </div>
                        </>
                    )
                })}
                </div>
                {
                    questiontype != "descriptive" ?
                    <>
                        <label htmlFor="">Add Options</label>
                    <div>
                        <input ref={addOption} type="text" name="options" id="question-options" onChange={(e)=>{setQuestionOption(e.target.value)}}/>
                        <button type="button" className="add-button" onClick={handleAddOption}>add</button>
                    </div>
                    </> :
                    <div></div>
                }
                <label htmlFor="set-time">Set Date and Time (In UTC 00:00)</label>
                <input type="datetime-local" name="time" id="question-time" onChange={(e) => {setTime(e.target.value)}} required/>
                <input type="submit" value={"Save"} />
            </form>
        </div>
        </div>
    )
};

export default AddQuestion;