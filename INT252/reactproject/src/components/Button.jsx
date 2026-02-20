const Button = ({btnText="Submit", classes=""}) => {
    return <button className={`bg-blue-400 ${classes}`}>{btnText}</button>
}

export default Button;