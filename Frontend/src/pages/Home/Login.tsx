import Form from "../../components/Form";
import "../../styles/login.css"
import ab from "../../static/ab.png"
import teot from "../../static/teot.png"
import aoem from "../../static/aoem.png"
import oh from "../../static/oh.png"
import abbg from "../../static/background-2.jpg"
import aoembg from  "../../static/aoembg.png"
import teotbg from  "../../static/teotbg.png"
import ohbg from  "../../static/ohbg.jpg"
import { useRef, useState } from "react";

function Login() {

    const [hovered, setHovered] = useState<number>()
    const [showForm, setShowForm] = useState<boolean>(true)

    const backgroundImage = useRef<HTMLDivElement>(null)
    const panelOptions = useRef<HTMLDivElement>(null)
    const divLoginForm = useRef<HTMLDivElement>(null)

    const handleABbackground = (n: number) => {
        setHovered(n)
        const backgrounds = [abbg, teotbg, aoembg, ohbg]
        if (backgroundImage.current) {
            backgroundImage.current.style.backgroundImage = `none`
            backgroundImage.current.style.backgroundImage = `url("${backgrounds[n]}")`
        }
    }

    const handleShowForm = () => {
        setShowForm(!showForm)
        if (panelOptions.current && divLoginForm.current) {
            if (showForm) {
                panelOptions.current.style.top = "50px"
                divLoginForm.current.style.visibility = "visible"
                divLoginForm.current.style.opacity = "1"    
            } else {
                panelOptions.current.style.top = "calc(50% - 120px)"
                divLoginForm.current.style.visibility = "hidden"
                divLoginForm.current.style.opacity = "0" 
            }

        }
    }


    return (
        <div ref={backgroundImage} className="login-page"> 
            <div ref={panelOptions} className="panel-servers">
                <div className={hovered == 0 ? "panel-image hovered": "panel-image"} onMouseOver={() =>{handleABbackground(0)}} onClick={() => handleShowForm()}>
                    <img src={ab} alt="ab" />
                </div>
                <div className={hovered == 1 ? "panel-image hovered": "panel-image"} onMouseOver={() =>{handleABbackground(1)}} onClick={() => handleShowForm()}>
                    <img src={teot} alt="teot" />
                </div>
                <div className={hovered == 2 ? "panel-image hovered": "panel-image"} onMouseOver={() =>{handleABbackground(2)}} onClick={() => handleShowForm()}>
                    <img src={aoem} alt="aoem" />
                </div>
                <div className={hovered == 3 ? "panel-image hovered": "panel-image"} onMouseOver={() =>{handleABbackground(3)}} onClick={() => handleShowForm()}>
                    <img src={oh} alt="oh" />
                </div>
            </div>
            <div className="div-login-form" ref={divLoginForm}>
                <Form route="/api/token/" method="login"/>
            </div>
        </div>
    )
}

export default Login;